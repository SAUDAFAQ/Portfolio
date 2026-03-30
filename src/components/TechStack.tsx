import * as THREE from "three";
import {
  useRef,
  useMemo,
  useState,
  useEffect,
  Suspense,
  useLayoutEffect,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Decal, useTexture } from "@react-three/drei";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { techStackLabels, type TechStackLabel } from "../data/portfolio";

const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

const FONT_STACK = `Geist, "Segoe UI", system-ui, -apple-system, sans-serif`;

/** 1×1 PNG so `useTexture` always receives a non-empty URL list (hooks rule). */
const TEXTURE_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

/**
 * White decal tile: tech name and/or optional icon (from loaded texture).
 */
function createLabelTexture(
  item: TechStackLabel,
  iconTexture?: THREE.Texture,
  size = 512
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  const hasIcon = Boolean(item.iconUrl && iconTexture);
  const showName =
    !hasIcon || item.showNameWithIcon !== false;

  if (hasIcon && iconTexture) {
    const img = iconTexture.image as CanvasImageSource & {
      naturalWidth?: number;
      naturalHeight?: number;
      width?: number;
      height?: number;
    };
    const iw =
      img.naturalWidth || (img as HTMLImageElement).width || img.width || 256;
    const ih =
      img.naturalHeight || (img as HTMLImageElement).height || img.height ||
      256;
    const pad = size * 0.1;
    const bottomReserve = showName ? size * 0.34 : pad;
    const maxW = size - pad * 2;
    const maxH = Math.max(size * 0.35, size - pad * 2 - bottomReserve);
    const scale = Math.min(maxW / iw, maxH / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const x = (size - dw) / 2;
    const y = pad + (maxH - dh) / 2;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, x, y, dw, dh);
  }

  if (showName) {
    const lines = item.name
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const maxTextWidth = size * 0.88;
    let fontSize = Math.floor(size * (hasIcon ? 0.15 : 0.22));
    const minFont = hasIcon ? 22 : 26;

    const measureWidest = (fs: number) => {
      ctx.font = `700 ${fs}px ${FONT_STACK}`;
      let w = 0;
      for (const line of lines) {
        w = Math.max(w, ctx.measureText(line).width);
      }
      return w;
    };

    while (fontSize > minFont && measureWidest(fontSize) > maxTextWidth) {
      fontSize -= 2;
    }

    const lineHeight = fontSize * 1.15;
    const blockHeight = lines.length * lineHeight;

    let y: number;
    if (hasIcon) {
      y = size - size * 0.08 - blockHeight + lineHeight / 2;
    } else {
      y = size / 2 - blockHeight / 2 + lineHeight / 2;
    }

    ctx.font = `700 ${fontSize}px ${FONT_STACK}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (const line of lines) {
      ctx.shadowColor = "rgba(0,0,0,0.06)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetY = 1;
      ctx.fillStyle = item.color;
      ctx.fillText(line, size / 2, y);
      y += lineHeight;
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  /* DecalGeometry UVs are mirrored on X; flip the map so labels read correctly on the sphere. */
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.repeat.set(-1, 1);
  tex.offset.set(1, 0);
  tex.needsUpdate = true;
  return tex;
}

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  labelTexture: THREE.Texture;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  labelTexture,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const body = api.current;
    if (!body) return;
    const impulse = vec
      .copy(body.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    body.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow={false}
        receiveShadow={false}
        scale={scale}
        geometry={sphereGeometry}
        rotation={[0.3, 1, 1]}
      >
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.55}
          metalness={0}
          envMapIntensity={0}
          toneMapped={true}
        />
        <Decal
          position={[0, 0, 1]}
          scale={[2.35, 2.35, 2.35]}
          map={labelTexture}
          polygonOffsetFactor={-8}
          depthTest={true}
        />
      </mesh>
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

function TechBubbles({ isActive }: { isActive: boolean }) {
  const { gl } = useThree();

  const uniqueIconUrls = useMemo(
    () =>
      Array.from(
        new Set(
          techStackLabels
            .map((l) => l.iconUrl)
            .filter((u): u is string => typeof u === "string" && u.length > 0)
        )
      ),
    []
  );

  const loadUrls =
    uniqueIconUrls.length > 0 ? uniqueIconUrls : [TEXTURE_PLACEHOLDER];
  const rawIcons = useTexture(loadUrls) as THREE.Texture[];

  useLayoutEffect(() => {
    rawIcons.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
    });
  }, [rawIcons]);

  const iconByUrl = useMemo(() => {
    const m = new Map<string, THREE.Texture>();
    uniqueIconUrls.forEach((u, i) => m.set(u, rawIcons[i]));
    return m;
  }, [uniqueIconUrls, rawIcons]);

  const labelTextures = useMemo(() => {
    return techStackLabels.map((item) => {
      const iconTex = item.iconUrl ? iconByUrl.get(item.iconUrl) : undefined;
      return createLabelTexture(item, iconTex);
    });
  }, [iconByUrl]);

  useLayoutEffect(() => {
    return () => {
      labelTextures.forEach((t) => t.dispose());
    };
  }, [labelTextures]);

  useLayoutEffect(() => {
    const max = gl.capabilities.getMaxAnisotropy();
    labelTextures.forEach((t) => {
      t.anisotropy = max;
    });
  }, [gl, labelTextures]);

  return (
    <>
      {/* Even, soft fill — avoids dark “grey” poles from strong key lights + HDR */}
      <ambientLight intensity={1.25} />
      <hemisphereLight
        args={["#ffffff", "#f5f5f5", 0.85]}
        position={[0, 20, 0]}
      />
      <directionalLight position={[4, 8, 6]} intensity={0.35} color="#ffffff" />
      <Physics gravity={[0, 0, 0]}>
        <Pointer isActive={isActive} />
        {spheres.map((props, i) => (
          <SphereGeo
            key={i}
            {...props}
            labelTexture={labelTextures[i % labelTextures.length]}
            isActive={isActive}
          />
        ))}
      </Physics>
    </>
  );
}

const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting && entry.intersectionRatio > 0.05);
      },
      { threshold: [0, 0.05, 0.15, 0.3], rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="techstack" id="tech" ref={sectionRef}>
      <h2>My techstack</h2>

      <Canvas
        shadows
        gl={{
          alpha: true,
          stencil: false,
          depth: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => {
          state.gl.toneMapping = THREE.ACESFilmicToneMapping;
          state.gl.toneMappingExposure = 1.05;
        }}
        className="tech-canvas"
      >
        <Suspense fallback={null}>
          <TechBubbles isActive={isActive} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechStack;
