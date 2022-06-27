<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Mahasiswa
      </p>
      <p class="subtitle">
        Menampilkan data Mahasiswa
      </p>
    </div>
  </section>

  <section class="content">
    <div class="container">
      <button class="button is-link" @click="showAdd" style="float: right">
        <span class="icon is-small" >
                    <i class="fas fa-plus"></i>
                  </span>
        <span>Add</span>
      </button>
      <table class="table">
        <thead>
        <tr>
          <th>No</th>
          <th>NIM</th>
          <th>Nama</th>
          <th>Tanggal Lahir</th>
          <th>Alamat</th>
          <th>Nomor Hp</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="data.length" v-for="(value, index) in data">
          <td>{{index + 1}}</td>
          <td>{{value.nim}}</td>
          <td>{{value.nama}}</td>
          <td>{{value.tgl_lahir}}</td>
          <td>{{value.alamat}}</td>
          <td>{{value.no_hp}}</td>
          <td>{{value.email}}</td>
          <td>
            <div class="field has-addons">
              <p class="control">
                <button class="button is-warning" @click="showUpdate(index)">
                  <span class="icon is-small">
                    <i class="fas fa-pencil"></i>
                  </span>
                  <span>Update</span>
                </button>
              </p>
              <p class="control">
                <button class="button is-danger" @click="showDelete(index)">
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                  <span>Delete</span>
                </button>
              </p>
            </div>
          </td>
        </tr>
        <tr v-else>
          <td colspan="9">
            <div class="notification ">
              Data Kosong
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="has-text-centered" v-if="isLoading">
      <i class="fa-solid fa-spinner fa-pulse"></i>
    </div>
  </section>
  <div class="modal" id="modal-delete">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <ul>
            <li>NIM <strong>{{data[selectedIndex].nim}}</strong></li>
            <li>NAMA <strong>{{data[selectedIndex].nama}}</strong></li>
            <li>NOHP <strong>{{data[selectedIndex].no_hp}}</strong></li>
          </ul>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="remove">Delete</button>
        <button class="button" @click="closeModal('modal-delete')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-update">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Update</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <form @submit.prevent="update">
            <div class="field">
              <label class="label" for="nama_update">Nama</label>
              <div class="control">
                <input class="input" type="text" id="nama_update" placeholder="Nama" required v-model="formEdit.nama">
              </div>
            </div>
            <div class="field">
              <label class="label" for="tgl_lahir_update">Tanggal Lahir</label>
              <div class="control">
                <input class="input" type="date" id="tgl_lahir_update" placeholder="Tanggal Lahir" required v-model="formEdit.tgl_lahir">
              </div>
            </div>
            <div class="field">
              <label class="label" for="alamat_update">Alamat</label>
              <div class="control">
                <input class="input" type="text" id="alamat_update" placeholder="Alamat" required v-model="formEdit.alamat">
              </div>
            </div>
            <div class="field">
              <label class="label" for="no_hp_update">Nomor HP</label>
              <div class="control">
                <input class="input" type="text" id="no_hp_update" placeholder="Nomor HP" required v-model="formEdit.no_hp">
              </div>
            </div>
            <div class="field">
              <label class="label" for="email_update">Email</label>
              <div class="control">
                <input class="input" type="text" id="email_update" placeholder="Nomor HP" required v-model="formEdit.email">
              </div>
            </div>
          </form>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="update">Update</button>
        <button class="button" @click="closeModal('modal-update')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-add">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new</p>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="nim_insert">NIM</label>
            <div class="control">
              <input class="input" type="text" id="nim_insert" placeholder="NIM" required v-model="formAdd.nim">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nama_insert">Nama</label>
            <div class="control">
              <input class="input" type="text" id="nama_insert" placeholder="Nama" required v-model="formAdd.nama">
            </div>
          </div>
          <div class="field">
            <label class="label" for="tgl_lahir_insert">Tanggal Lahir</label>
            <div class="control">
              <input class="input" type="date" id="tgl_lahir_insert" placeholder="Tanggal Lahir" required v-model="formAdd.tgl_lahir">
            </div>
          </div>
          <div class="field">
            <label class="label" for="alamat_insert">Alamat</label>
            <div class="control">
              <input class="input" type="text" id="alamat_insert" placeholder="Alamat" required v-model="formAdd.alamat">
            </div>
          </div>

          <div class="field">
            <label class="label" for="no_hp_insert">Nomor HP</label>
            <div class="control">
              <input class="input" type="text" id="no_hp_insert" placeholder="Nomor HP" required v-model="formAdd.no_hp">
            </div>
          </div>
          <div class="field">
            <label class="label" for="email_insert">Email</label>
            <div class="control">
              <input class="input" type="text" id="email_insert" placeholder="Email" required v-model="formAdd.email">
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="addNew">Save</button>
        <button class="button" @click="closeModal('modal-add')">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";
export default {
  name: "Mahasiswa",
  data(){
    return{
      data: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        nim: '',
        nama:'',
        tgl_lahir: new Date().toISOString().slice(0, 10),
        alamat: '',
        no_hp: '',
        email: ''

      },
      formEdit: {
        nim: '',
        nama:'',
        tgl_lahir: new Date().toISOString().slice(0, 10),
        alamat: '',
        no_hp: '',
        email: ''
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      //const baseurl = `https://uaskuliahweb.000webhostapp.com`;
      fetch(`https://uaskuliahweb.000webhostapp.com/mahasiswa/read.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.data = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    },
    remove(){
      this.closeModal('modal-delete');
      if(this.selectedIndex >= 0){
        //const baseurl = `https://uaskuliahweb.000webhostapp.com`;
        const selectedData = this.data[this.selectedIndex];
        const payload = new URLSearchParams({
          'nim': selectedData.nim
        });
        fetch(`https://uaskuliahweb.000webhostapp.com/mahasiswa/delete.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            if(response.ok){
              this.data.splice(this.selectedIndex, 1);
            }
            return response.json();
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }
          })
          .catch(()=>{
            alert('error')
          })
      }
      this.selectedIndex = -1;
    },
    update(){
      this.closeModal('modal-update');
      if(this.selectedIndex >= 0){
        //const baseurl = `https://uaskuliahweb.000webhostapp.com`;
        const payload = new URLSearchParams({
          nim: this.formEdit.nim,
          nama: this.formEdit.nama,
          alamat: this.formEdit.alamat,
          tgl_lahir: this.formEdit.tgl_lahir,
          no_hp: this.formEdit.no_hp,
          email: this.formEdit.email,
        });
        fetch(`https://uaskuliahweb.000webhostapp.com/mahasiswa/update.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            return response.json()
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }else{
              /*
              Update data pada kolom yg diupdate
               */
              this.data[this.selectedIndex] = json.data;
            }
          })
          .catch( (e) =>{
            alert('Terjadi error'+e.toString())
          })
          .finally(()=>{
            this.selectedIndex = -1;
          })
      }
    },
    showDelete(index){
      this.showModal('modal-delete');
      this.selectedIndex = index;
    },
    showUpdate(index){
      this.showModal('modal-update');
      this.selectedIndex = index;
      const selectedData = this.data[index];
      this.formEdit = {
        nim: selectedData.nim,
        nama: selectedData.nama,
        tgl_lahir: selectedData.tgl_lahir,
        alamat: selectedData.alamat,
        no_hp: selectedData.no_hp,
        email: selectedData.email,
      }
      nextTick(()=>{
        document.getElementById('nama_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('nim_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      //const baseurl = `https://uaskuliahweb.000webhostapp.com`;
      const payload = new URLSearchParams({
        nim: this.formAdd.nim,
        nama: this.formAdd.nama,
        tgl_lahir: this.formAdd.tgl_lahir,
        alamat: this.formAdd.alamat,
        no_hp: this.formAdd.no_hp,
        email: this.formAdd.email,
      });
      fetch(`https://uaskuliahweb.000webhostapp.com/mahasiswa/create.php`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      })
        .then(response => {
          return response.json()
        })
        .then(json =>{
          if(!json.status){
            alert(json.error);
          }else{
            this.data.push(json.data);
          }
        })
        .catch( (e) =>{
          alert('error'+e.toString())
        })
        .finally(()=>{
          this.formAdd.nama = '';
        })
    },
    showModal(id){
      document.getElementById(id).classList.add('is-active');
    },
    closeModal(id){
      document.getElementById(id).classList.remove('is-active');
    },
    resetFormAdd(){
      this.formAdd = {
        nama:'',
        tgl_lahir: new Date().toISOString().slice(0, 10),
        alamat: '',
        no_hp: '',
        email: ''
      }
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>
</style>
