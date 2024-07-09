"use client";

import { CREATE_TODO, DELETE_TODO } from "@/graphql/mutations";
import { GET_TODOS } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

interface ITodo {
  id?: string
  title: string,
  description: string,
  completed: boolean
}

const defaultValues = {
  title: "",
  description: "",
  completed: false,
}

export default function Home() {
  const [form, setForm] = useState<ITodo>(defaultValues)

  const { loading: loadingTodos, data } = useQuery(GET_TODOS)

  const [createTodo, { loading }] = useMutation(CREATE_TODO, {
    refetchQueries: [GET_TODOS],
    onCompleted: () => {
      setForm(defaultValues)
    }
  })

  const [deleteTodo, { loading: deletingTodo }] = useMutation(DELETE_TODO, {
    refetchQueries: [GET_TODOS],
  })

  const onSubmit = () => {
    if (!form.title) return alert("title is required")

    createTodo({
      variables: {
        todoDetails: form
      }
    })
  }


  return (
    <main className="p-8 max-w-4xl mx-auto space-y-4">
      <div className="flex flex-col gap-4">
        <input placeholder="Enter title" value={form.title} onChange={e => setForm(val => ({ ...val, title: e.target.value }))} />
        <textarea placeholder="Enter description(optional)" value={form.description} onChange={e => setForm(val => ({ ...val, description: e.target.value }))} />
        <div className="flex gap-x-2 items-center">
          <input checked={form.completed} onChange={(e) => setForm(val => ({ ...val, completed: e.target.checked }))} id="completed" type="checkbox" />
          <label htmlFor="completed">Completed</label>
        </div>
        <button disabled={loading} onClick={onSubmit} className="w-fit ml-auto">add -&gt;</button>
      </div>
      {loadingTodos && (<h1>loading...</h1>)}
      <div className="space-y-6">
        {
          data?.todos?.map(({ title, completed, description, id }: ITodo) => {
            return (
              <div key={id} className="relative shadow-sm border rounded-md p-4">
                <button className="absolute top-4 right-4 rounded-full" onClick={() => deleteTodo({
                  variables: {
                    id: id!
                  }
                })} disabled={deletingTodo}>X</button>
                <h1>{title}</h1>
                <p>{description}</p>
                {completed ? "C" : "X"}
              </div>
            )
          })
        }
      </div>
    </main>
  );
}


export const dynamic = "force-dynamic";