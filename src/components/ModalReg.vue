<template>
    <modal
        title="Регистрация"
        @close="closeModal()">

        <div slot="body" class="modal-body">
            <form action="#" @submit.prevent="onSubmiit()">

                <!-- Login -->
                <div class="form-item" :class="{errorInput: $v.login.$error}">
                    <p class="errorText" v-if="!$v.login.required">Поле не может быть пустым!</p>
                    <p class="errorText" v-if="!$v.login.minLength">Поле не может быть короче {{ $v.login.$params.minLength.min }} !</p>
                    <label>Логин:</label> 
                    <input 
                        v-model="login"
                        :class="{error: $v.login.$error}"
                        @change="$v.login.$touch()">
                </div>

                <!-- Email -->
                <div class="form-item" :class="{errorInput: $v.email.$error}">
                    <p class="errorText" v-if="!$v.email.required">Поле не может быть пустым!</p>
                    <p class="errorText" v-if="!$v.email.email">Поле не похоже на email!</p>
                    <label>Email</label> 
                    <input 
                        v-model="email"
                        :class="{error: $v.email.$error}"
                        @change="$v.email.$touch()">
                </div>

                <!-- Password -->
                <div class="form-item" :class="{errorInput: $v.password.$error}">
                    <p class="errorText" v-if="!$v.password.required">Введите пароль!</p>
                    <p class="errorText" v-if="!$v.password.minLength">Пароль не может быть короче {{ $v.password.$params.minLength.min }} символов!</p> 
                    <p class="errorText" v-if="!$v.password">Введите пароль!</p>
                    <label>Придумайте пароль</label>
                    <input
                        type="password" 
                        v-model="password"
                        :class="{error: $v.password.$error}"
                        @change="$v.password.$touch()">    
                </div>

                <!-- Password Repeat -->
                <div class="form-item" :class="{errorInput: $v.repeatPassword.$error}"> 
                    <p class="errorText" v-if="!$v.repeatPassword.sameAsPassword">Пароли не совпадают!</p>
                    <label>Введите пароль ещё раз</label>
                    <input
                        type="password" 
                        v-model="repeatPassword"
                        :class="{error: $v.repeatPassword.$error}"
                        @change="$v.repeatPassword.$touch()">    
                </div>
                <button class="btn btnSuccess" >Отправить!</button>
                
            </form> 
        </div>
        <div slot="footer" class="modal-footer">
            <p @click="$emit('changeModal'),closeModal()">У вас уже есть аккаунт? Войти</p>
        </div>

    </modal>
</template>

<script>
import modal from '@/components/UI/Modal.vue'
import { required, minLength, email,sameAs } from 'vuelidate/lib/validators'

export default {
    components: {modal},
    props: {
        title: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            login: '',
            email: '',
            password: '',
            repeatPassword: ''
        }
    },
    validations: {
        login: {
            required,
            minLength: minLength(3)
        },
        email: {
            email
        },
        password: {
            required,
            minLength: minLength(5)
        },
        repeatPassword: {
            sameAsPassword: sameAs('password') 
        }
    },
    methods: {
        closeModal() { 
            this.login = '',
            this.email = '',
            this.password = '',
            this.repeatPassword = '',
            this.$v.$reset(),
            this.$emit('close')
        },
        onSubmiit(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                const user =  {
                    login: this.login,
                    email: this.email,
                    pass: this.password
                }
                this.closeModal() 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-footer{
    width: calc(100% + 40px );
    margin-bottom: -25px; 
    height: 70px;
    margin-left: -20px;
    background: #e2e2e2;
    padding: 10px 5px;
    display: flex;
    align-items: center;
    justify-content: center; 
    color: #9b9b9b;
    margin-top: 30px;
    p{
        cursor: pointer;
    }
}

</style>