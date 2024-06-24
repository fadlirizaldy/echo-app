import AddThreadButton from "../components/AddThreadButton";

const stories = {
  title: "Button Add",
  component: AddThreadButton,
};

const TemplateStory = (args) => <AddThreadButton {...args} />;

export default stories;

const WithTypeAddThread = TemplateStory.bind({});
WithTypeAddThread.args = {
  label: "Add Thread",
};

const WithTypeAddNewThread = TemplateStory.bind({});
WithTypeAddNewThread.args = {
  label: "Add New Thread",
};

export { WithTypeAddThread, WithTypeAddNewThread };
