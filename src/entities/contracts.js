export const getBNValue = (balance, decimal) => {
  return (balance * (10 ** decimal)).toString();
}