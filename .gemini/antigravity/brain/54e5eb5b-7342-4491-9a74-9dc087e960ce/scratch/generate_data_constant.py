import json

def generate_tsx_data(json_path):
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    output = "const DATA = " + json.dumps(data, indent=2, ensure_ascii=False) + ";"
    return output

json_data = generate_tsx_data('/Users/lorenzocalifano/Documents/Progetti/gweb2026/.gemini/antigravity/brain/54e5eb5b-7342-4491-9a74-9dc087e960ce/scratch/candidates_data_v3.json')
with open('/Users/lorenzocalifano/Documents/Progetti/gweb2026/.gemini/antigravity/brain/54e5eb5b-7342-4491-9a74-9dc087e960ce/scratch/data_constant.txt', 'w', encoding='utf-8') as f:
    f.write(json_data)

print("Generated data constant.")
