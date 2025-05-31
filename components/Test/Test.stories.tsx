import { Test } from "@/components/Test/Test";
import { View } from "react-native";


const Container = () => {
  return (
    <View style={{ width: 320, height: 580,  backgroundColor: '#000',  flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Test />
    </View>
  );
};


export default {
  title: 'Test',
  component: Container,
  argTypes: {
  },
};


export const Default = {
  args: {
  },
};
