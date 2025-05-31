import { TestCamera } from "@/components/appmx/TestCameraFlow/TestCamera/TestCamera";

export default {
  title: 'TestCamera',
  component: TestCamera,
  argTypes: {
  }
};


export const Default = {
  args: {
    photoUri: "https://picsum.photos/200",
    onDone: () => {},
  },
};
