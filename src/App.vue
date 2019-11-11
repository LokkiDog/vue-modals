<template>
  <div class="wrapper"> 
    <div class="wrapper-content">
      <section>
        <div class="container"> 
          <div class="modalsTest">
            <button class="btn btnPrimary" @click="modalFirst = !modalFirst">Показать первую модалку</button>
            <button class="btn btnPrimary" @click="modalSecond.show = !modalSecond.show">Показать окно с формой</button>
            <button class="btn btnPrimary" @click="modalValidate = !modalValidate">Показать окно с формой + валидацией</button>
          </div>
          <div class="modalReg">
            <button class="btn btnDanger" @click="modalLogIn = !modalLogIn">Вход</button>
            <button class="btn btnDanger" @click="modalReg = !modalReg">Регистрация</button>
          </div>
          <!-- first modal -->
          <modals 
            v-show="modalFirst" 
            title="First modal" 
            @close="modalFirst = false">

            <div slot="body" class="modal-body">
              <p>Какой-то интеренсный текст</p>
              <button class="btn btnPrimary" @click="modalFirst = !modalFirst">Ура! Я прочитал!</button>
            </div>
          </modals> 

          <!-- second modal -->
          <modals 
            v-show="modalSecond.show" 
            title="First modal" 
            @close="modalSecond.show = false">

            <div slot="body" class="modal-body"> 
              <form action="#" @submit.prevent="submitSecondForm()">
                <label>Имя</label>
                <input type="text" v-model="modalSecond.name" required>
                <label>Email</label> 
                <input type="email" v-model="modalSecond.email" required>
                <button class="btn btnPrimary">Отправить!</button>
              </form>
            </div>
          </modals>

          <!-- third modal -->
          <modalValidate v-show="modalValidate" title="Форма с валидацией" @close="modalValidate = false"/>

          <!-- registration -->
          <modalReg 
            v-show="modalReg" 
            title="Регистрация" 
            @close="modalReg = false"  
            @changeModal="modalReg = false;modalLogIn = true;"/>

          <!-- LogIn -->
          <modalLogIn 
            v-show="modalLogIn" 
            title="Регистрация" 
            @close="modalLogIn = false" 
            @changeModal="modalLogIn = false;modalReg = true;"/>
        </div>
      </section>
    </div> 
  </div>
</template>

<script> 
import modals from '@/components/UI/Modal.vue'
import modalValidate from '@/components/ModalValidate.vue'
import modalReg from '@/components/ModalReg.vue'
import modalLogIn from '@/components/ModalLogIn.vue'

export default {
  components: {modals, modalValidate, modalReg, modalLogIn},
  data(){
    return{
      modalFirst: false,
      modalSecond: {
        show: false,
        name: "",
        email: "",
        data: ""
      },
      modalValidate: false,
      modalLogIn: false,
      modalReg: false
    }
  },
  methods: {
    submitSecondForm(){
      console.log({
        name: this.modalSecond.name,
        email: this.modalSecond.email,
      })
      this.modalSecond.name = "",
      this.modalSecond.email = "",
      this.modalSecond.show = false
    }
  }
} 
</script>  

<style lang="scss">
  .modalsTest, .modalReg{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 0px;
  }
  .modalReg{
    margin-top: 100px;
    justify-content: space-around;
  }
</style>