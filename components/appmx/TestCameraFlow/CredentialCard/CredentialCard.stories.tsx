import { CredentialCard } from "@/components/appmx/TestCameraFlow/CredentialCard/CredentialCard";
import { View } from "react-native";


const Container = () => {
  return (
    
      <CredentialCard photoUri="https://picsum.photos/200" onDone={() => {}} />
    
  );
};


export default {
  title: 'CredentialCard',
  component: Container,
  argTypes: {
  },
  parameters: {
    layout: 'centered',
  },
};


export const Default = {
  args: {
  },
};
