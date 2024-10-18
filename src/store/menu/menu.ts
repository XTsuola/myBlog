import { defineStore } from "pinia";

export const useMenuStore = defineStore({
  id: "menu",
  state: () => ({
    label: "",
    detail: "",
    yibu: false,
    phone: "",
    email: "",
    mapData: null,
    isAdmin: "",
  }),
  getters: {
    
  },
  actions: {
    updateLabel(name: string) {
      this.label = name;
    },
    updateDetail(name: string) {
      this.detail = name;
    },
    updateYibu(flag: boolean) {
      this.yibu = flag;
    },
    updateUserInfo(phone:string, email:string) {
      this.phone = phone;
      this.email = email;
    },
    updateMapData(data: any) {
      this.mapData = data;
    },
    updateIsAdmin(flag: string) {
      this.isAdmin = flag;
    },
  },
  // persist: true  //持久化存储
  persist: {
    storage: sessionStorage, // 使用 sessionStorage 作为存储
  }
})
