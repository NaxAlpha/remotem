import path from 'path';
import { renderStill, getCompositions } from '@remotion/renderer';
import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

function calculateFramesToRender(totalFrames: number, n: number): number[] {
    if (n <= 1) return [0];
    return Array.from(
        { length: n },
        (_, i) => Math.round(i * ((totalFrames - 1) / (n - 1)))
    );
}

const renderSpecificFrames = async (compositionId: string, serveUrl: string, outputDir: string, n: number) => {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const compositions = await getCompositions(serveUrl);
    const composition = compositionId === undefined ?
        compositions[0] :
        compositions.find((c) => c.id === compositionId);
    console.log('Rendering composition:', composition?.id);
    if (!composition) {
        console.error(`Composition with ID ${compositionId} not found`);
        process.exit(1);
    }
    const totalFrames = composition.durationInFrames;
    const framesToRender = calculateFramesToRender(totalFrames, n);

    for (let i = 0; i < framesToRender.length; i++) {
        const frame = framesToRender[i];
        await renderStill({
            composition,
            serveUrl,
            output: path.join(outputDir, `frame-${i}.png`),
            frame,
            imageFormat: 'png',
        });
        console.log(`Rendered frame ${frame}`);
    }
};

type CLIOptions = {
    composition: string;
    serveUrl: string;
    outputDir: string;
    frames: number;
};

program
    .option('-c, --composition <id>', 'Composition ID', undefined)
    .option('-s, --serve-url <url>', 'Remotion server URL', './build')
    .option('-o, --output-dir <dir>', 'Output directory', path.join(process.cwd(), 'renders'))
    .option('-n, --frames <number>', 'Number of frames to render', '5')
    .action(async (options: CLIOptions) => {
        await renderSpecificFrames(options.composition, options.serveUrl, options.outputDir, Number(options.frames));
        console.log('Rendering complete.');
    });

program.parse(process.argv);
