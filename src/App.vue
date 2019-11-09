<template>
  <div class="wrapper"> 
    <div class="wrapper-content">
      <section>
        <div class="container"> 

          <button class="btn btnPrimary" @click="modalFirst = !modalFirst">Показать первую модалку</button>
          <button class="btn btnPrimary" @click="modalSecond.show = !modalSecond.show">Показать окно с формой</button>
          <button class="btn btnPrimary" @click="modalValidate = !modalValidate">Показать окно с формой + валидацией</button>

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

        </div>
      </section>
    </div> 
  </div>
</template>

<script> 
import modals from '@/components/UI/Modal.vue'
import modalValidate from '@/components/ModalValidate.vue'

export default {
  components: {modals, modalValidate},
  data(){
    return{
      modalFirst: false,
      modalSecond: {
        show: false,
        name: "",
        email: "",
        data: ""
      },
      modalValidate: false
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