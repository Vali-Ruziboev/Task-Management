<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $statusDictionary = [
            0 => 'ToDo',
            1 => 'In Progress',
            2 => 'Completed',
        ];

        $tasks = Task::all()->groupBy('status')->map(fn ($task) => $task->sortBy('priority'));

        $tasks = collect($statusDictionary)->map(fn ($status, $key) => ['title' => $status, 'tasks' => $tasks->has($key) ? $tasks[$key]->values() : []])->values();

        return response()->json($tasks);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Task::create([
             'title' => $request->title,
             'description' => $request->description,
             'priority' => $request->priority,
         ]);

        return response()->json(['message' => 'task successfully created']);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        $task->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json(['message' => 'task successfully updated']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json(['message' => 'task successfully deleted']);
    }

    public function reorder(Request $request, Task $task, $status)
    {
        $order = $request->order;

        $tasks = Task::all();

        if ($task->status !== $status) {
            $task->update(['status' => $status]);
        }

        collect($order)->values()->map(fn ($ord, $index) => $tasks->find($ord)->update(['priority' => $index]));

        return response()->json(['message' => 'Reorder was successfull']);
    }
}
