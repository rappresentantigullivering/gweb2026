import json
import re

def parse_candidates_v3(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by double newlines to find structural blocks
    # But wait, some sections have single newlines for candidates
    # A better approach: 1. Name is a candidate. "Lista:" is a list header. 
    # Anything else is Organ or Sub-Organ.

    lines = [l.strip() for l in content.split('\n') if l.strip()]
    
    sections = []
    current_organ = "CONSIGLIO STUDENTESCO" # Default for first block if not specified
    current_sub_organ = None
    current_list_type = "Ordinari"
    current_count = None
    current_candidates = []
    
    # Major markers
    cucs_marker = "CONSIGLI UNIFICATI E CONSIGLI DI CORSO DI STUDIO (C.U.C.S E C.C.S.)"
    
    in_cucs_mode = False

    def flush():
        nonlocal current_candidates
        if current_candidates:
            sections.append({
                "organ": current_organ,
                "sub_organ": current_sub_organ,
                "type": current_list_type,
                "count": current_count or str(len(current_candidates)),
                "candidates": list(current_candidates),
                "is_cs": "CONSIGLIO STUDENTESCO" in (current_organ or "")
            })
            current_candidates = []

    for line in lines:
        if cucs_marker in line:
            flush()
            current_organ = cucs_marker
            in_cucs_mode = True
            continue

        # Candidate detection
        candidate_match = re.match(r'^(\d+)\.\s*(.*)', line)
        if candidate_match:
            current_candidates.append(candidate_match.group(2).strip())
            continue

        # List header detection
        list_header_match = re.search(r'Lista: (.*?) \(Candidati: (\d+)\)', line)
        if list_header_match:
            flush()
            type_match = re.search(r'\[(.*?)\]', line)
            current_list_type = type_match.group(1) if type_match else "Ordinari"
            current_count = list_header_match.group(2)
            
            # Text before "Lista:" might be organ/sub-organ
            prefix = line.split("Lista:")[0].strip()
            if prefix:
                if in_cucs_mode:
                    current_sub_organ = prefix
                else:
                    current_organ = prefix
                    current_sub_organ = None
            continue

        # Structural header detection (not candidate, not list header)
        flush()
        if in_cucs_mode:
            current_sub_organ = line
        else:
            current_organ = line
            current_sub_organ = None
        current_list_type = "Ordinari" # Reset type
        current_count = None

    flush()
    return sections

data = parse_candidates_v3('/Users/lorenzocalifano/Documents/Progetti/gweb2026/modifiche/candidati.txt')
with open('/Users/lorenzocalifano/Documents/Progetti/gweb2026/.gemini/antigravity/brain/54e5eb5b-7342-4491-9a74-9dc087e960ce/scratch/candidates_data_v3.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Parsed {len(data)} sections/sub-sections")
