import { CredentialCard } from "@/components/appmx/TestCameraFlow/CredentialCard/CredentialCard";
import { View } from "react-native";




export default {
  title: 'components/CredentialCard',
  component: CredentialCard,
  argTypes: {
  }
};


export const Default = {
  args: {
    photoUri: "",
    onDone: () => {},
  },
};
