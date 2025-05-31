import { CredentialCard } from "@/components/appmx/TestCameraFlow/CredentialCard/CredentialCard";
import { View } from "react-native";




export default {
  title: 'CredentialCard',
  component: CredentialCard,
  argTypes: {
  }
};


export const Default = {
  args: {
    photoUri: "https://picsum.photos/200",
    onDone: () => {},
  },
};
