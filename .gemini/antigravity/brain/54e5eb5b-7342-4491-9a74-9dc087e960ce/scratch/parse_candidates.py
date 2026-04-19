import json
import re

def parse_candidates(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define sections
    sections = []
    
    # Extract main sections
    # Consiglio Studentesco
    cs_match = re.search(r'CONSIGLIO STUDENTESCOLista: Gulliver - Sinistra Universitaria \(Candidati: (\d+)\) (.*?)(?=DIPARTIMENTI DELLA FACOLTA\' DI INGEGNERIA|$)', content)
    if cs_match:
        count = cs_match.group(1)
        names_str = cs_match.group(2)
        # Parse names: 1. Name 2. Name
        names = re.findall(r'\d+\. (.*?)(?=\s\d+\.|$)', names_str)
        sections.append({
            "title": "Consiglio Studentesco",
            "count": count,
            "candidates": names,
            "highlight": True
        })

    # Dipartimenti
    # Ingegneria
    ing_match = re.search(r"DIPARTIMENTI DELLA FACOLTA' DI INGEGNERIALista: Gulliver - Sinistra Universitaria \(Candidati: (\d+)\) (.*?)(?=Lista: Gulliver - Sinistra Universitaria \[LISTA DOTTORANDI\]|$)", content)
    if ing_match:
        count = ing_match.group(1)
        names_str = ing_match.group(2)
        names = re.findall(r'\d+\. (.*?)(?=\s\d+\.|$)', names_str)
        sections.append({
            "title": "Dipartimenti Ingegneria",
            "count": count,
            "candidates": names
        })

    # Dottorandi Ingegneria
    ing_dot_match = re.search(r"Lista: Gulliver - Sinistra Universitaria \[LISTA DOTTORANDI\] \(Candidati: (\d+)\) (.*?)(?=DIPARTIMENTO DI SCIENZE AGRARIE|$)", content)
    if ing_dot_match:
        count = ing_dot_match.group(1)
        names_str = ing_dot_match.group(2)
        names = re.findall(r'\d+\. (.*?)(?=\s\d+\.|$)', names_str)
        sections.append({
            "title": "Dipartimenti Ingegneria (Dottorandi)",
            "count": count,
            "candidates": names
        })

    # Agraria
    agr_match = re.search(r"DIPARTIMENTO DI SCIENZE AGRARIE, ALIMENTARI E AMBIENTALILista: Gulliver - Sinistra Universitaria \(Candidati: (\d+)\) (.*?)(?=Lista: Gulliver - Sinistra Universitaria \[LISTA DOTTORANDI\]|$)", content)
    if agr_match:
        count = agr_match.group(1)
        names_str = agr_match.group(2)
        names = re.findall(r'\d+\. (.*?)(?=\s\d+\.|$)', names_str)
        sections.append({
            "title": "Dipartimento Agraria",
            "count": count,
            "candidates": names
        })

    # Dottorandi Agraria
    # ... and so on ...

    # Actually, a more generic parser might be better because the file is very long.
    
    # Try splitting by keywords
    keywords = [
        "CONSIGLIO STUDENTESCO",
        "DIPARTIMENTI DELLA FACOLTA' DI INGEGNERIA",
        "DIPARTIMENTO DI SCIENZE AGRARIE, ALIMENTARI E AMBIENTALI",
        "DIPARTIMENTO DI SCIENZE DELLA VITA E DELL'AMBIENTE",
        "DIPARTIMENTI DELLA FACOLTA' DI ECONOMIA \"GIORGIO FUA\"",
        "DIPARTIMENTI DELLA FACOLTA' DI MEDICINA E CHIRURGIA",
        "CONSIGLI UNIFICATI E CONSIGLI DI CORSO DI STUDIO (C.U.C.S E C.C.S.)"
    ]
    
    # Special parsing for the last section because it has many sub-sub-sections
    cucs_ccs_marker = "CONSIGLI UNIFICATI E CONSIGLI DI CORSO DI STUDIO (C.U.C.S E C.C.S.)"
    main_parts = content.split(cucs_ccs_marker)
    
    upper_part = main_parts[0]
    lower_part = main_parts[1] if len(main_parts) > 1 else ""
    
    # Parse upper part
    # Use re.split to find major headings
    headings = [
        "CONSIGLIO STUDENTESCO",
        "DIPARTIMENTI DELLA FACOLTA' DI INGEGNERIA",
        "DIPARTIMENTO DI SCIENZE AGRARIE, ALIMENTARI E AMBIENTALI",
        "DIPARTIMENTO DI SCIENZE DELLA VITA E DELL'AMBIENTE",
        "DIPARTIMENTI DELLA FACOLTA' DI ECONOMIA \"GIORGIO FUA\"",
        "DIPARTIMENTI DELLA FACOLTA' DI MEDICINA E CHIRURGIA"
    ]
    
    parsed_sections = []
    
    current_pos = 0
    for i in range(len(headings)):
        start_idx = upper_part.find(headings[i])
        if start_idx == -1: continue
        
        end_idx = upper_part.find(headings[i+1]) if i+1 < len(headings) else len(upper_part)
        section_content = upper_part[start_idx:end_idx]
        
        # Within section, find lists
        # Lists start with "Lista: Gulliver - Sinistra Universitaria"
        list_parts = re.split(r'(Lista: Gulliver - Sinistra Universitaria(?: \[.*?\])? \(Candidati: \d+\))', section_content)
        
        section_title = headings[i]
        
        for j in range(1, len(list_parts), 2):
            header = list_parts[j]
            names_text = list_parts[j+1]
            
            # Extract count from header
            count_match = re.search(r'Candidati: (\d+)', header)
            count = count_match.group(1) if count_match else "?"
            
            # Extract list type if any (e.g. DOTTORANDI)
            type_match = re.search(r'\[(.*?)\]', header)
            list_type = type_match.group(1) if type_match else "Ordinari"
            
            # Parse names
            names = re.findall(r'\d+\. (.*?)(?=\s\d+\.|$)', names_text)
            
            parsed_sections.append({
                "organ": section_title,
                "type": list_type,
                "count": count,
                "candidates": names,
                "is_cs": section_title == "CONSIGLIO STUDENTESCO"
            })

    # Parse lower part (CUCS/CCS)
    # They look like: C.U.C.S. NAMELista: Gulliver - Sinistra Universitaria (Candidati: X) 1. Name 2. Name
    cucs_ccs_list = re.split(r'((?:C\.U\.C\.S\.|C\.C\.S\.) .*?Lista: Gulliver - Sinistra Universitaria \(Candidati: \d+\))', lower_part)
    
    for i in range(1, len(cucs_ccs_list), 2):
        header = cucs_ccs_list[i]
        names_text = cucs_ccs_list[i+1]
        
        # Split header into organ and list part
        # C.U.C.S. INGEGNERIA ELETTRONICALista: ...
        header_match = re.search(r'((?:C\.U\.C\.S\.|C\.C\.S\.) .*?)Lista:', header)
        organ_name = header_match.group(1).strip() if header_match else "CUCS/CCS"
        
        count_match = re.search(r'Candidati: (\d+)', header)
        count = count_match.group(1) if count_match else "?"
        
        # Parse names
        names = re.findall(r'\d+\. (.*?)(?=\s\d+\.|$)', names_text)
        
        parsed_sections.append({
            "organ": "CUCS / CCS",
            "sub_organ": organ_name,
            "type": "Corso di Studio",
            "count": count,
            "candidates": names,
            "is_cs": False
        })

    return parsed_sections

data = parse_candidates('/Users/lorenzocalifano/Documents/Progetti/gweb2026/modifiche/candidati.txt')
with open('/Users/lorenzocalifano/Documents/Progetti/gweb2026/.gemini/antigravity/brain/54e5eb5b-7342-4491-9a74-9dc087e960ce/scratch/candidates_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Parsed {len(data)} sub-sections")
