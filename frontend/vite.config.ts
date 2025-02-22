import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

import withMT from "@material-tailwind/react/utils/withMT";


export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})


