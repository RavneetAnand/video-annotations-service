import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// This function is used to fetch JSON files from the `data` directory.
export const fetchJson = async (path: string) => {
  const jsonPath = join(__dirname, `../data/${path}`);
  const jsonData = JSON.parse(readFileSync(jsonPath, 'utf8'));
  return jsonData;
};
