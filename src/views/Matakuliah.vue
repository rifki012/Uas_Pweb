<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Matakuliah
      </p>
      <p class="subtitle">
        Menampilkan data Matakuliah
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
          <th>Kode Mk</th>
          <th>Nama Mk</th>
          <th>Sks</th>
          <th>Semester</th>
          <th>Program Studi</th>
          <th>Keterangan</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="data.length" v-for="(value, index) in data">
          <td>{{index + 1}}</td>
          <td>{{value.kode_mk}}</td>
          <td>{{value.nama_mk}}</td>
          <td>{{value.sks}}</td>
          <td>{{value.semester}}</td>
          <td>{{value.program_studi}}</td>
          <td>{{value.keterangan}}</td>
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
            <div class="notification center">
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
            <li>KODE <strong>{{data[selectedIndex].kode_mk}}</strong></li>
            <li>NAMAMK <strong>{{data[selectedIndex].nama_mk}}</strong></li>
            <li>SKS <strong>{{data[selectedIndex].sks}}</strong></li>
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
              <label class="label" for="nama_mk_update">Nama MK</label>
              <div class="control">
                <input class="input" type="text" id="nama_mk_update" placeholder="Nama MK" required v-model="formEdit.nama_mk">
              </div>
            </div>
            <div class="field">
              <label class="label" for="sks_update">SKS</label>
              <div class="control">
                <input class="input" type="text" id="sks_update" placeholder="SKS" required v-model="formEdit.sks">
              </div>
            </div>
            <div class="field">
              <label class="label" for="semester_update">Semester</label>
              <div class="control">
                <input class="input" type="text" id="semester_update" placeholder="Semester" required v-model="formEdit.semester">
              </div>
            </div>
            <div class="field">
              <label class="label" for="program_studi_update">Program Studi</label>
              <div class="control">
                <input class="input" type="text" id="program_studi_update" placeholder="Program Studi" required v-model="formEdit.program_studi">
              </div>
            </div>
            <div class="field">
              <label class="label" for="keterangan_update">Keterangan</label>
              <div class="control">
                <input class="input" type="text" id="keterangan_update" placeholder="Keterangan" required v-model="formEdit.keterangan">
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
            <label class="label" for="kode_mk_insert">Kode Mk</label>
            <div class="control">
              <input class="input" type="text" id="kode_mk_insert" placeholder="Kode Mk" required v-model="formAdd.kode_mk">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nama_mk_insert">Nama Mk</label>
            <div class="control">
              <input class="input" type="text" id="nama_mk_insert" placeholder="Nama Mk" required v-model="formAdd.nama_mk">
            </div>
          </div>
          <div class="field">
            <label class="label" for="sks_insert">Sks</label>
            <div class="control">
              <input class="input" type="text" id="sks_insert" placeholder="Sks" required v-model="formAdd.sks">
            </div>
          </div>
          <div class="field">
            <label class="label" for="semester_insert">Semester</label>
            <div class="control">
              <input class="input" type="text" id="semester_insert" placeholder="Semester" required v-model="formAdd.semester">
            </div>
          </div>
          <div class="field">
            <label class="label" for="program_studi_insert">Program Studi</label>
            <div class="control">
              <input class="input" type="text" id="program_studi_insert" placeholder="Program Studi" required v-model="formAdd.program_studi">
            </div>
          </div>
          <div class="field">
            <label class="label" for="keterangan_insert">Keterangan</label>
            <div class="control">
              <input class="input" type="text" id="keterangan_insert" placeholder="Keterangan" required v-model="formAdd.keterangan">
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
  name: "Matakuliah",
  data(){
    return{
      data: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        kode_mk:'',
        nama_mk:'',
        sks:'',
        semester:'',
        program_studi:'',
        keterangan:''

      },
      formEdit: {
        kode_mk:'',
        nama_mk:'',
        sks:'',
        semester:'',
        program_studi:'',
        keterangan:''
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch('https://uaskuliahweb.000webhostapp.com/matakuliah/read.php',{
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
          alert('Error')
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
          'kode_mk': selectedData.kode_mk
        });
        fetch(`https://uaskuliahweb.000webhostapp.com/matakuliah/delete.php`,{
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
        //const baseurl = `https://uaskuliahweb.000webhostapp.com`;
        const payload = new URLSearchParams({
          kode_mk: this.formEdit.kode_mk,
          nama_mk: this.formEdit.nama_mk,
          sks: this.formEdit.sks,
          semester: this.formEdit.semester,
          program_studi:this.formEdit.program_studi,
          keterangan:this.formEdit.keterangan,
        });
        fetch(`https://uaskuliahweb.000webhostapp.com/matakuliah/update.php`,{
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
        kode_mk: selectedData.kode_mk,
        nama_mk: selectedData.nama_mk,
        sks: selectedData.sks,
        semester: selectedData.semester,
        program_studi: selectedData.program_studi,
        keterangan: selectedData.keterangan,
      }
      nextTick(()=>{
        document.getElementById('namamk_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('kode_mk_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      //const baseurl = `https://uaskuliahweb.000webhostapp.com`;
      const payload = new URLSearchParams({
        kode_mk: this.formAdd.kode_mk,
        nama_mk: this.formAdd.nama_mk,
        sks: this.formAdd.sks,
        semester: this.formAdd.semester,
        program_studi: this.formAdd.program_studi,
        keterangan: this.formAdd.keterangan,
      });
      fetch(`https://uaskuliahweb.000webhostapp.com/matakuliah/create.php`,{
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
        kode_mk: '',
        nama_mk:'',
        sks: '',
        semester: '',
        program_studi:'',
        keterangan:''
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
