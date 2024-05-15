#!/bin/bash

output_file="directory_structure.txt"

# Function to recursively print directory structure
print_tree() {
    local current_dir="$1"
    local indent="$2"
    local is_last="$3"
    local prefix=""

    if [ "$indent" != "" ]; then
        prefix="$indent"
        if [ "$is_last" = true ]; then
            prefix+="└── "
            indent+="    "
        else
            prefix+="├── "
            indent+="│   "
        fi
    fi

    echo "${prefix}$(basename "$current_dir")" >> "$output_file"

    local items=("$current_dir"/*)
    local total_items=${#items[@]}
    local count=1

    for item in "${items[@]}"; do
        if [ -d "$item" ]; then
            print_tree "$item" "$indent" $(( count == total_items ))
        else
            if [ $count -eq $total_items ]; then
                echo "${indent}└── $(basename "$item")" >> "$output_file"
            else
                echo "${indent}├── $(basename "$item")" >> "$output_file"
            fi
        fi
        ((count++))
    done
}

# Clear the output file
echo "" > "$output_file"

# Start printing from the current directory
print_tree "." "" true

echo "Directory structure has been written to $output_file"
