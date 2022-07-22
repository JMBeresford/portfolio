import model from '@/assets/models/office.glb';
import { useGLTF } from '@react-three/drei';

const WallLight = () => {
  const { nodes } = useGLTF(model);

  return (
    <mesh
      position={nodes.Wall_Emissive.position}
      geometry={nodes.Wall_Emissive.geometry}
    >
      <meshBasicMaterial color={'white'} />
    </mesh>
  );
};

export default WallLight;
