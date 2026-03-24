import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useStore } from "../store/useStore";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);
  const { theme } = useStore();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init || (theme !== 'dark' && theme !== 'neon')) return null;

  const isNeon = theme === 'neon';

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-0"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: isNeon ? "repulse" : "grab",
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            grab: {
              distance: 150,
              links: {
                opacity: 0.5,
              },
            },
          },
        },
        particles: {
          color: {
            value: isNeon ? "#4ade80" : "#ffffff",
          },
          links: {
            color: isNeon ? "#4ade80" : "#ffffff",
            distance: 150,
            enable: true,
            opacity: isNeon ? 0.3 : 0.1,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: isNeon ? 2 : 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              width: 800,
              height: 800,
            },
            value: isNeon ? 60 : 40,
          },
          opacity: {
            value: isNeon ? 0.6 : 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: isNeon ? 3 : 2 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
