function generateProcesses(n) {
    let processes = [];
    let currentTime = 0;
    
    for (let i = 0; i < n; i++) {
        let arrivalTime = currentTime + Math.floor(Math.random() * 5); // Chegada aleatória
        let burstTime = Math.floor(Math.random() * 10) + 1; // Tempo de execução aleatório
        processes.push({ id: i + 1, arrivalTime, burstTime });
        currentTime = arrivalTime;
    }
    return processes;
}

function fifoScheduling(processes) {
    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
    let idleTime = 0;
    let processSwitchTime = 0;
    let processLog = [];

    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    for (let i = 0; i < processes.length; i++) {
        let process = processes[i];
        if (currentTime < process.arrivalTime) {
            idleTime += process.arrivalTime - currentTime;
            currentTime = process.arrivalTime;
        }
        let startTime = currentTime;
        let finishTime = startTime + process.burstTime;
        let turnaroundTime = finishTime - process.arrivalTime;
        let waitingTime = startTime - process.arrivalTime;
        
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
        currentTime = finishTime;
        if (i < processes.length - 1) processSwitchTime += 1; // Tempo de troca entre processos
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
const result = fifoScheduling(processes);

console.log("Detalhes dos processos executados:", result.processLog);
console.log("Tempo médio de espera:", result.avgWaitingTime.toFixed(2));
console.log("Tempo médio de retorno:", result.avgTurnaroundTime.toFixed(2));
console.log("Tempo de ociosidade do processador:", result.idleTime);
console.log("Tempo total de troca de processos:", result.processSwitchTime);
