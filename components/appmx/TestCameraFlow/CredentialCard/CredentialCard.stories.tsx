import { CredentialCard } from "@/components/appmx/TestCameraFlow/CredentialCard/CredentialCard";
import { View } from "react-native";


const Container = () => {
  return (
    <View style={{ width: 320, height: 580,  backgroundColor: '#000',  flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CredentialCard />
    </View>
  );
};


export default {
  title: 'CredentialCard',
  component: Container,
  argTypes: {
  },
};


export const Default = {
  args: {
  },
};
