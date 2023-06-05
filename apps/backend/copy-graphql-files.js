import { promises as fsPromises, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const { copyFile, readdir } = fsPromises;

const sourceDir = 'src';
const destinationDir = 'dist';

const copyGraphQLFiles = async (source, destination) => {
  const files = await readdir(source, { withFileTypes: true });

  for (const file of files) {
    const sourcePath = join(source, file.name);
    const destinationPath = join(destination, file.name);

    if (file.isDirectory()) {
      if (!existsSync(destinationPath)) {
        mkdirSync(destinationPath);
      }
      await copyGraphQLFiles(sourcePath, destinationPath);
    } else if (file.name.endsWith('.graphql')) {
      try {
        await copyFile(sourcePath, destinationPath);
        console.log(`Copied ${sourcePath} to ${destinationPath}`);
      } catch (error) {
        console.error(`Error copying ${sourcePath}:`, error);
      }
    }
  }
};

const main = async () => {
  try {
    await copyGraphQLFiles(sourceDir, destinationDir);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

main();
