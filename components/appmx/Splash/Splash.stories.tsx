import { Splash } from "@/components/appmx/Splash/Splash";
import { View } from "react-native";


const Container = () => {
  return (
    <View style={{ width: 320, height: 580,  backgroundColor: '#000',  flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Splash />
    </View>
  );
};


export default {
  title: 'Splash',
  component: Container,
  argTypes: {
  },
};


export const Default = {
  args: {
  },
};
