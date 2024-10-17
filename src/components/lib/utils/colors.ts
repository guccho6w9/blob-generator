export const predefinedColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * predefinedColors.length);
  return predefinedColors[randomIndex];
};
