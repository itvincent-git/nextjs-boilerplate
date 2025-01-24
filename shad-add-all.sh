#!/bin/bash

components=(
  "accordion" "alert" "alert-dialog" "aspect-ratio" "avatar"
  "badge" "breadcrumb" "button" "calendar" "card" "carousel"
  "checkbox" "collapsible" "command" "context-menu"
  "table" "dialog" "drawer" "dropdown-menu" "form" "hover-card"
  "input" "label" "menubar" "navigation-menu" "pagination" "popover"
  "progress" "radio-group" "resizable" "scroll-area" "select" "separator"
  "sheet" "sidebar" "skeleton" "slider" "sonner" "switch" "table"
  "tabs" "textarea" "toast" "toggle" "tooltip"
)

for component in "${components[@]}"; do
  echo "▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄"
  echo "Adding $component..."
  yes Y | pnpm dlx shadcn@latest add $component
done

# Install other dependencies
pnpm add @tanstack/react-table @radix-ui/react-icons lucide-react