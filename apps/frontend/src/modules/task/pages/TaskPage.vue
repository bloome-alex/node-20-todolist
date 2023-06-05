<template>
    <v-row class="mt-1 ml-3">
        <v-col cols="12" md="6">
            <h2 class="ml-2">Task Management</h2>
        </v-col>
        <v-col cols="12" md="6" align-self="center">
            <v-row :justify="$vuetify.display.mdAndUp ? 'end' : 'center'" class="mr-4">
                <v-btn 
                    :icon="$vuetify.display.mdAndUp" color="blue" :block="!$vuetify.display.mdAndUp"
                    @click="dialog=true">
                    <v-icon>add</v-icon>
                    {{ $vuetify.display.mdAndUp ? '' : 'Añadir tarea' }}
                </v-btn>
            </v-row>
        </v-col>
        <v-col cols="12">
            <v-dialog v-model="dialog" width="auto">
                <v-card>
                    <v-card-text>
                        <h3>Añadir una nueva tarea a la lista de tareas</h3>
                        <v-divider />
                        <v-form v-model="formValue">
                            <v-text-field 
                                label="Titulo"
                                prepend-inner-icon="text_fields"
                                v-model="form.title"
                                :rules="[v => !!v || 'Este campo es requerido.']"/>
                            <v-text-field
                                label="Autor"
                                prepend-inner-icon="person"
                                v-model="form.author"
                                :rules="[v => !!v || 'Este campo es requerido.']"/>
                            <v-btn color="blue" block :disabled="!formValue" @click="addTask">Añadir</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-col>
        <v-col cols="12">
            <v-table class="mr-4">
                <thead>
                    <tr>
                        <th class="text-center" v-for="header in headers">
                            {{ header }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="task of tasks">
                        <td class="text-center">{{ task.author }}</td>
                        <td class="text-center">{{ task.title }}</td>
                        <td class="mx-auto">
                            <v-row justify="center" align-content="center" align="center">
                                <v-col cols="12" md="4" align-self="center">
                                    <v-checkbox 
                                        :label="task.checked ? 'Listo' : 'Falta'" 
                                        v-model="task.checked"
                                        @change="updateTask(task)"></v-checkbox>
                                </v-col>
                            </v-row>
                        </td>
                        <td class="text-center">
                            <template v-if="$vuetify.display.smAndDown">
                                <v-btn icon color="light-blue" @click="deleteTask(task.id ? task.id : '')"><v-icon>edit</v-icon></v-btn>
                                <v-btn icon color="red" @click="editTask(task)"><v-icon>delete</v-icon></v-btn>
                            </template>
                            <template v-else>
                                <v-btn color="light-blue" class="mx-2" @click="editTask(task)">
                                    <v-icon>edit</v-icon> Editar
                                </v-btn>
                                <v-btn color="red" class="mx-2" @click="deleteTask(task.id ? task.id : '')">
                                    <v-icon>delete</v-icon> Eliminar
                                </v-btn>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-col>
        <v-col cols="12">
            <v-dialog v-model="dialogEdit" width="auto">
                <v-card width="auto">
                    <v-card-text>
                        <h3>Editar la tarea de la lista de tareas</h3>
                        <v-divider></v-divider>
                        <v-form v-model="editFormValue">
                            <v-text-field 
                                label="Titulo"
                                prepend-inner-icon="text_fields"
                                v-model="taskEditing.title"
                                :rules="[v => !!v || 'Este campo es requerido.']"/>
                            <v-text-field
                                label="Autor"
                                prepend-inner-icon="person"
                                v-model="taskEditing.author"
                                :rules="[v => !!v || 'Este campo es requerido.']"/>
                            <v-checkbox
                                :label="taskEditing.checked ? 'Listo' : 'Falta'" 
                                v-model="taskEditing.checked"
                            ></v-checkbox>
                            <v-btn @click="updateTask(taskEditing)" color="light-blue" block>
                                <v-icon start>edit_note</v-icon>Editar
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import { z } from 'zod'

    import taskProvider from '../providers/taskProviders'

    const dataSchema = z.object({
        dialog: z.boolean(),
        formValue: z.union([z.boolean(), z.null()]),
        form: z.object({
            title: z.string(),
            author: z.string()
        }),
        tasks: z.array(z.object({
            id: z.string(),
            title: z.string(),
            author: z.string(),
            checked: z.boolean()
        }).partial()),
        headers: z.array(z.string()),
        dialogEdit: z.boolean(),
        taskEditing: z.object({
            id: z.string(),
            title: z.string(),
            author: z.string(),
            checked: z.boolean()
        }).partial(),
        editFormValue: z.boolean()
    })

    export default {
        name: 'TaskPage',
        data(): z.infer<typeof dataSchema>{
            return {
                dialog: false,
                formValue: false,
                form: {
                    title: '',
                    author: ''
                },
                tasks: [],
                headers: [ 'Autor', 'Title', 'Estado', 'Acciones' ],
                dialogEdit: false,
                taskEditing: {},
                editFormValue: false
            }
        },
        mounted(){
            this.fetchTasks()
        },
        methods:{
            async fetchTasks(){
                const { data } = await taskProvider.fetchTask()
                this.tasks = data.fetchTasks.map((task:{author: string, title: string, checked: boolean, id: string}) => {
                    return{
                        id: task.id,
                        author: task.author,
                        title: task.title,
                        checked: task.checked
                    }
                })
            },
            async addTask(){
                await taskProvider.createTask(this.form)
                this.fetchTasks()
                this.dialog = false
                this.form = {
                    title: '',
                    author: ''
                }
            },
            async deleteTask(id:string){
                await taskProvider.deleteTask(id),
                this.fetchTasks()
            },
            async updateTask(task:{author?: string | undefined, title?: string | undefined, checked?: boolean | undefined, id?: string | undefined}){
                console.log(task)
                await taskProvider.updateTask(task)
                this.fetchTasks()
                this.dialogEdit = false
            },
            editTask(task: {author?: string | undefined, title?: string | undefined, checked?: boolean | undefined, id?: string | undefined}){
                this.taskEditing = task
                this.dialogEdit = true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>