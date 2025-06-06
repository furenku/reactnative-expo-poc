import { MainLayout } from "@/components/appmx/MainLayout/MainLayout";



export default {
  title: 'layouts/Main',
  component: MainLayout,
  argTypes: {
  }
  
};


export const Default = {
  args: {
    showHeader: true
  },
};

export const NoHeader = {
  args: {
    showHeader: false
  },
};
