<?php

namespace App\Console\Commands;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Console\Command;

class AutoDelete extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'auto:delete';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Look for tasks that was completed 30 days from now and delete';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        return Task::where('status', '2')->where('updated_at', '<', Carbon::now()->subDays(30))->delete();
    }
}
