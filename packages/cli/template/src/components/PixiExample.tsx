import { useEffect, useRef } from 'react';
import { Application, Graphics } from 'pixi.js';

export default function PixiExample() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new Application();
    let mounted = true;

    (async () => {
      await app.init({
        background: '#1a1a2e',
        width: 420,
        height: 220,
        antialias: true,
      });

      if (!mounted) {
        app.destroy(true);
        return;
      }

      if (containerRef.current) {
        containerRef.current.appendChild(app.canvas as HTMLCanvasElement);
      }

      // Blue filled circle
      const circle = new Graphics();
      circle.circle(105, 110, 60);
      circle.fill({ color: 0x4fc3f7 });
      app.stage.addChild(circle);

      // Pink filled triangle
      const triangle = new Graphics();
      triangle.poly([315, 50, 255, 170, 375, 170]);
      triangle.fill({ color: 0xf06292 });
      app.stage.addChild(triangle);
    })();

    return () => {
      mounted = false;
      app.destroy(true);
    };
  }, []);

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>PixiJS Example</h3>
      <div ref={containerRef} className="pixi-example" />
    </div>
  );
}
