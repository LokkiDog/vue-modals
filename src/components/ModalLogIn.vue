<template>
    <modal
        title="Вход"
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
                <!-- Password -->
                <div class="form-item" :class="{errorInput: $v.password.$error}">
                    <p class="errorText" v-if="!$v.password.required">Введите пароль!</p>
                    <p class="errorText" v-if="!$v.password.minLength">Пароль не может быть короче {{ $v.password.$params.minLength.min }} символов!</p> 
                    <p class="errorText" v-if="!$v.password">Введите пароль!</p>
                    <label>Пароль</label>
                    <input
                        type="password" 
                        v-model="password"
                        :class="{error: $v.password.$error}"
                        @change="$v.password.$touch()">    
                </div>
 
                <button class="btn btnSuccess">Отправить!</button> 
            </form> 
        </div>
        <div slot="footer" class="modal-footer">
            <p @click="$emit('changeModal'),closeModal()">У вас нет аккаунта? Зарегистрироваться</p>
        </div>

    </modal>
</template>

<script>
import modal from '@/components/UI/Modal.vue'
import { required, minLength,} from 'vuelidate/lib/validators'

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
            password: ''
        }
    },
    validations: {
        login: {
            required,
            minLength: minLength(3)
        },
        password: {
            required,
            minLength: minLength(5)
        }
    },
    methods: {
        closeModal() { 
            this.login = '', 
            this.password = '', 
            this.$v.$reset(),
            this.$emit('close')
        },
        onSubmiit(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                const user =  {
                    login: this.login, 
                    pass: this.password
                }
                console.log(user);
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