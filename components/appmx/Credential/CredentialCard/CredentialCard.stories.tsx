import { CredentialCard } from "@/components/appmx/Credential/CredentialCard/CredentialCard";

export default {
  title: 'components/Credential/CredentialCard',
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
