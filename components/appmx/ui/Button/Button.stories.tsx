import { Button } from "@/components/appmx/ui/Button/Button";


export default {
  title: 'ui/Button',
  component: Button,
  argTypes: {
  },
};

const title = "Haz clic"

export const Default = {
  args: {
    title,
  },
};

export const Outline = {
  args: {
    title,
    variant: "outline"
  },
};

export const Disabled = {
  args: {
    title,
    disabled: true
  },
};

