<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Ambil Matakuliah
      </p>
      <p class="subtitle">
        Menampilkan data Ambil Matakuliah
      </p>
    </div>
  </section>

  <section class="content">
    <div class="container">
      <button class="button is-link" @click="showAdd" style="float: right">
        <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                  </span>
        <span>Add</span>
      </button>
      <table class="table">
        <thead>
        <tr>
          <th>No</th>
          <th>NIM</th>
          <th>Kode Mk</th>
          <th>Tahun Ajar</th>
          <th>Ruangan</th>
          <th>Hari</th>
          <th>Tanggal Ambil Mk</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="data.length" v-for="(value, index) in data">
          <td>{{index + 1}}</td>
          <td>{{value.nim}}</td>
          <td>{{value.kode_mk}}</td>
          <td>{{value.tahun_ajaran}}</td>
          <td>{{value.ruangan}}</td>
          <td>{{value.hari}}</td>
          <td>{{value.tgl_ambilmk}}</td>
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
            <div class="notification">
              Tidak ada data
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
            <li>KODE MK <strong>{{data[selectedIndex].kode_mk}}</strong></li>
            <li>TAHUN <strong>{{data[selectedIndex].tahun_ajaran}}</strong></li>
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
              <label class="label" for="kode_mk_update">Kode Mk</label>
              <div class="control">
                <input class="input" type="text" id="kode_mk_update" placeholder="Kode Mk" required v-model="formEdit.kode_mk">
              </div>
            </div>
            <div class="field">
              <label class="label" for="tahun_update">Tahun Ajar</label>
              <div class="control">
                <input class="input" type="text" id="tahun_update" placeholder="Tahun" required v-model="formEdit.tahun_ajaran">
              </div>
            </div>
            <div class="field">
              <label class="label" for="ruangan_update">Ruangan</label>
              <div class="control">
                <input class="input" type="text" id="ruangan_update" placeholder="Ruangan" required v-model="formEdit.ruangan">
              </div>
            </div>
            <div class="field">
              <label class="label" for="hari_update">Hari</label>
              <div class="control">
                <input class="input" type="text" id="hari_update" placeholder="Hari" required v-model="formEdit.hari">
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
            <label class="label" for="nim_insert">Nim</label>
            <div class="control">
              <input class="input" type="text" id="nim_insert" placeholder="Nim" required v-model="formAdd.nim">
            </div>
          </div>
          <div class="field">
            <label class="label" for="kode_mk_insert">Kode MK</label>
            <div class="control">
              <input class="input" type="text" id="kode_mk_insert" placeholder="Tahun Ajaran" required v-model="formAdd.kode_mk">
            </div>
          </div>
          <div class="field">
            <label class="label" for="tahun_ajaran_insert">Tahun Ajaran</label>
            <div class="control">
              <input class="input" type="text" id="tahun_ajaran_insert" placeholder="Tahun Ajaran" required v-model="formAdd.tahun_ajaran">
            </div>
          </div>
          <div class="field">
            <label class="label" for="ruangan_insert">Ruangan</label>
            <div class="control">
              <input class="input" type="text" id="ruangan_insert" placeholder="Ruangan" required v-model="formAdd.ruangan">
            </div>
          </div>
          <div class="field">
            <label class="label" for="hari_insert">Hari</label>
            <div class="control">
              <input class="input" type="text" id="hari_insert" placeholder="Hari" required v-model="formAdd.hari">
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
  name: "AmbilMatkul",
  data(){
    return{
      data: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        nim: '',
        kode_mk: '',
        tahun_ajaran: '',
        ruangan: '',
        hari: ''
      },
      formEdit: {
        mahasiswa: '',
        matakuliah: '',
        tahun_ajaran: '',
        ruangan: '',
        hari: ''
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://uaskuliahweb.000webhostapp.com/ambilmk/read.php`,{
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
        //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const selectedData = this.data[this.selectedIndex];
        const payload = new URLSearchParams({
          'nim': selectedData.nim,
          'kode_mk': selectedData.kode_mk
        });
        fetch(`https://uaskuliahweb.000webhostapp.com/ambilmk/delete.php`,{
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
            alert('Terjadi error')
          })
      }
      this.selectedIndex = -1;
    },
    update(){
      this.closeModal('modal-update');
      if(this.selectedIndex >= 0){
        //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const payload = new URLSearchParams({
          nim: this.formEdit.nim,
          kode_mk: this.formEdit.kode_mk,
          tahun_ajaran: this.formEdit.tahun_ajaran,
          ruangan: this.formEdit.ruangan,
          hari: this.formEdit.hari,
        });
        fetch(`https://uaskuliahweb.000webhostapp.com/ambilmk/update.php`,{
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
        kode_mk: selectedData.kode_mk,
        tahun_ajaran: selectedData.tahun_ajaran,
        ruangan: selectedData.ruangan,
        hari: selectedData.hari,
      }
      nextTick(()=>{
        document.getElementById('kode_mk_update').focus();
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
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      const payload = new URLSearchParams({
        nim: this.formAdd.nim,
        kode_mk: this.formAdd.kode_mk,
        tahun_ajaran: this.formAdd.tahun_ajaran,
        ruangan: this.formAdd.ruangan,
        hari: this.formAdd.hari,
      });
      fetch(`https://uaskuliahweb.000webhostapp.com/ambilmk/create.php`,{
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
          alert('Terjadi error'+e.toString())
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
        nim: '',
        kode_mk: '',
        tahun_ajaran: '',
        ruangan: '',
        hari: ''
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
