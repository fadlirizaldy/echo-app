import AddThreadButton from "../components/AddThreadButton";

const stories = {
  title: "Button Add",
  component: AddThreadButton,
};

const TemplateStory = (args) => <AddThreadButton {...args} />;

export default stories;

const WithBlueColor = TemplateStory.bind({});
WithBlueColor.args = {
  label: "Add Thread",
};

const WithRedColor = TemplateStory.bind({});
WithRedColor.args = {
  label: "Add Thread",
  className: "bg-red-400 hover:bg-red-500",
};

const WithJustOutline = TemplateStory.bind({});
WithJustOutline.args = {
  label: "Add Thread",
  className: "bg-white !text-black border border-slate-300",
};

export { WithBlueColor, WithRedColor, WithJustOutline };
