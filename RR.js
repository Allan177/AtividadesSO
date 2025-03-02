function generateProcesses(n) {
    let processes = [];
    let currentTime = 0;
    
    for (let i = 0; i < n; i++) {
        let arrivalTime = currentTime + Math.floor(Math.random() * 5); // Chegada aleatória
        let burstTime = Math.floor(Math.random() * 10) + 1; // Tempo de execução aleatório
        processes.push({ id: i + 1, arrivalTime, burstTime, remainingTime: burstTime });
        currentTime = arrivalTime;
    }
    return processes;
}

function roundRobinScheduling(processes, quantum) {
    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
    let idleTime = 0;
    let processSwitchTime = 0;
    let processLog = [];
    let readyQueue = [];
    let completed = [];
    
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let i = 0;
    
    while (completed.length < processes.length) {
        while (i < processes.length && processes[i].arrivalTime <= currentTime) {
            readyQueue.push(processes[i]);
            i++;
        }
        
        if (readyQueue.length === 0) {
            idleTime++;
            currentTime++;
            continue;
        }
        
        let process = readyQueue.shift();
        let executionTime = Math.min(process.remainingTime, quantum);
        let startTime = currentTime;
        let finishTime = startTime + executionTime;
        process.remainingTime -= executionTime;
        
        if (process.remainingTime === 0) {
            let turnaroundTime = finishTime - process.arrivalTime;
            let waitingTime = turnaroundTime - process.burstTime;
            completed.push(process);
            processLog.push({
                id: process.id,
                arrivalTime: process.arrivalTime,
                burstTime: process.burstTime,
                startTime,
                finishTime,
                turnaroundTime,
                waitingTime
            });
            totalWaitingTime += waitingTime;
            totalTurnaroundTime += turnaroundTime;
        } else {
            readyQueue.push(process);
        }
        
        currentTime = finishTime;
        if (readyQueue.length > 0 || i < processes.length) processSwitchTime += 1;
    }

    let avgWaitingTime = totalWaitingTime / processes.length;
    let avgTurnaroundTime = totalTurnaroundTime / processes.length;

    return {
        processLog,
        avgWaitingTime,
        avgTurnaroundTime,
        idleTime,
        processSwitchTime
    };
}

const n = 5; // Número de processos
const quantum = 3; // Tempo de fatia do Round Robin
const processes = generateProcesses(n);
const result = roundRobinScheduling(processes, quantum);

console.log("Detalhes dos processos executados:", result.processLog);
console.log("Tempo médio de espera:", result.avgWaitingTime.toFixed(2));
console.log("Tempo médio de retorno:", result.avgTurnaroundTime.toFixed(2));
console.log("Tempo de ociosidade do processador:", result.idleTime);
console.log("Tempo total de troca de processos:", result.processSwitchTime);
