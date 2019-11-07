<template>
    <modal  
        title="Модальное окно с валидацией" 
        @close="$emit('close')">

        <div slot="body" class="modal-body"> 
            <form action="#" @submit.prevent="onSubmiit()">
                <div class="form-item" :class="{errorInput: $v.name.$error}">
                    <p class="errorText" v-if="!$v.name.required">Поле не может быть пустым!</p>
                    <p class="errorText" v-if="!$v.name.minLength">Поле не может быть короче {{ $v.name.$params.minLength.min }} !</p>
                    <label>Имя</label>
                    <input 
                        v-model="name"
                        :class="{error: $v.name.$error}"
                        @change="$v.name.$touch()">
                </div>
                <div class="form-item" :class="{errorInput: $v.email.$error}">
                    <p class="errorText" v-if="!$v.email.required">Поле не может быть пустым!</p>
                    <p class="errorText" v-if="!$v.email.email">Поле не похоже на email!</p>
                    <label>Email</label> 
                    <input 
                        v-model="email"
                        :class="{error: $v.email.$error}"
                        @change="$v.email.$touch()">
                </div> 
                <button class="btn btnSuccess" >Отправить!</button>
            </form>
        </div>
    </modal>
</template>

<script>
import modal from '@/components/UI/Modal.vue'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    components: { modal },
    props:{
        title: {
            type: String,
            required: true
        }
    },
    data(){
        return{
            name: '',
            email: ''
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(3)
        },
        email: {
            required,
            email
        }
    },
    methods: {
        onSubmiit(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                const user =  {
                    name: this.name,
                    email: this.email
                }
                console.log(user);
                this.name = '',
                this.email = '',
                this.$v.$reset(),
                this.$emit('close')

            }
        }
    }
    
}
</script>

<style lang="scss">
.form-item .errorText {
    display: none;
    margin-bottom: 8px;
    font-size: 12.4px;
    color: #de4040;
}
.form-item{
    &.errorInput .errorText {
        display: block;
    }
}
input.error {
    border-color: #de4040;
}
</style>