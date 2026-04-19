import json
import re

def parse_candidates_v2(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    sections = []
    current_organ = None
    current_sub_organ = None
    current_list_type = None
    current_candidates = []
    current_count = None

    def flush():
        if current_candidates:
            sections.append({
                "organ": current_organ,
                "sub_organ": current_sub_organ,
                "type": current_list_type,
                "count": current_count,
                "candidates": list(current_candidates),
                "is_cs": current_organ == "CONSIGLIO STUDENTESCO"
            })
            current_candidates.clear()

    for line in lines:
        line = line.strip()
        if not line: continue

        # Header detection
        # Logic: 
        # 1. If line starts with 1. 2. 3., it's a candidate
        # 2. If line contains "Lista:", it's a list header
        # 3. Else, it's an organ or sub-organ name

        candidate_match = re.match(r'^(\d+)\.\s*(.*)', line)
        if candidate_match:
            current_candidates.append(candidate_match.group(2).strip())
            continue

        list_header_match = re.search(r'Lista: (.*?) \(Candidati: (\d+)\)', line)
        if list_header_match:
            flush()
            # Extract type from [LISTA ...]
            type_match = re.search(r'\[(.*?)\]', line)
            current_list_type = type_match.group(1) if type_match else "Ordinari"
            current_count = list_header_match.group(2)
            
            # If "Lista:" is at the start of the line, the organ/sub-organ was already set
            # Otherwise, the text before "Lista:" is the organ/sub-organ
            prefix = line.split("Lista:")[0].strip()
            if prefix:
                if prefix == "CONSIGLIO STUDENTESCO":
                    current_organ = prefix
                    current_sub_organ = None
                elif prefix.startswith("C.U.C.S.") or prefix.startswith("C.C.S."):
                    current_sub_organ = prefix
                    # current_organ stays the same (Consigli unificati...)
                else:
                    current_organ = prefix
                    current_sub_organ = None
            continue

        # If it's not a candidate and not a list header, it's a structural heading
        if "CONSIGLI UNIFICATI" in line:
            current_organ = "CONSIGLI UNIFICATI E CONSIGLI DI CORSO DI STUDIO (C.U.C.S E C.C.S.)"
            continue
            
        # Generic organ/sub-organ
        # If we are under CUCS/CCS, it's a sub-organ
        if current_organ == "CONSIGLI UNIFICATI E CONSIGLI DI CORSO DI STUDIO (C.U.C.S E C.C.S.)":
            current_sub_organ = line
        else:
            current_organ = line
            current_sub_organ = None

    flush() # Last one
    return sections

data = parse_candidates_v2('/Users/lorenzocalifano/Documents/Progetti/gweb2026/modifiche/candidati.txt')
with open('/Users/lorenzocalifano/Documents/Progetti/gweb2026/.gemini/antigravity/brain/54e5eb5b-7342-4491-9a74-9dc087e960ce/scratch/candidates_data_v2.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Parsed {len(data)} sections/sub-sections")
