import { CredentialApproval } from "@/components/appmx/TestCameraFlow/CredentialApproval/CredentialApproval";
import { View } from "react-native";


const Container = () => {
  return (
    <View style={{ width: 320, height: 580,  backgroundColor: '#000',  flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CredentialApproval />
    </View>
  );
};


export default {
  title: 'CredentialApproval',
  component: Container,
  argTypes: {
  },
};


export const Default = {
  args: {
  },
};
