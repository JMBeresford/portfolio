import model from '@/assets/models/office.glb';
import { useGLTF } from '@react-three/drei';

const Lamp = () => {
  const { nodes } = useGLTF(model);

  return (
    <mesh
      position={nodes.Lamp_Emissive.position}
      geometry={nodes.Lamp_Emissive.geometry}
    >
      <meshBasicMaterial color={'white'} />
    </mesh>
  );
};

export default Lamp;
