import { MainLayout } from "@/components/appmx/MainLayout/MainLayout";



export default {
  title: 'layouts/Main',
  component: MainLayout,
  argTypes: {
  }
  
};


export const Default = {
  args: {
    showHeader: true,
    showFooter: true
  },
};

export const NoHeaderFooter = {
  args: {
    showHeader: false,
    showFooter: false
  },
};


export const Biometrics = {
  args: {
    showHeader: true,
    showFooter: false,
    biometrics: 'pending'
  },
};
