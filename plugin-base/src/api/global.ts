export default {
  getProductList(data: any = {}) {
    return {
      url: 'config',
      method: 'get',
      data
    };
  }
};
