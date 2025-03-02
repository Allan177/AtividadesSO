function generateProcesses(n) {
    let processes = [];
    let currentTime = 0;
    
    for (let i = 0; i < n; i++) {
        let arrivalTime = currentTime + Math.floor(Math.random() * 5); // Chegada aleatória
        let burstTime = Math.floor(Math.random() * 10) + 1; // Tempo de execução aleatório
        let priority = Math.floor(Math.random() * 5) + 1; // Prioridade aleatória (1 é maior prioridade)
        processes.push({ id: i + 1, arrivalTime, burstTime, priority });
        currentTime = arrivalTime;
    }
    return processes;
}

function priorityScheduling(processes) {
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
        
        readyQueue.sort((a, b) => a.priority - b.priority); // Menor valor = maior prioridade
        let process = readyQueue.shift();
        
        let startTime = currentTime;
        let finishTime = startTime + process.burstTime;
        let turnaroundTime = finishTime - process.arrivalTime;
        let waitingTime = startTime - process.arrivalTime;
        
        processLog.push({
            id: process.id,
            arrivalTime: process.arrivalTime,
            burstTime: process.burstTime,
            priority: process.priority,
            startTime,
            finishTime,
            turnaroundTime,
            waitingTime
        });
        
        totalWaitingTime += waitingTime;
        totalTurnaroundTime += turnaroundTime;
        currentTime = finishTime;
        completed.push(process);
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
const processes = generateProcesses(n);
const result = priorityScheduling(processes);

console.log("Detalhes dos processos executados:", result.processLog);
console.log("Tempo médio de espera:", result.avgWaitingTime.toFixed(2));
console.log("Tempo médio de retorno:", result.avgTurnaroundTime.toFixed(2));
console.log("Tempo de ociosidade do processador:", result.idleTime);
console.log("Tempo total de troca de processos:", result.processSwitchTime);
