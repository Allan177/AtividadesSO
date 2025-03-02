from collections import deque

class MemoryManager:
    def __init__(self, num_frames):
        self.num_frames = num_frames  # Número total de quadros na memória física
        self.frames = {}  # Dicionário para mapear quadros aos processos e páginas
        self.page_table = {}  # Tabelas de páginas por processo
        self.queue = deque()  # Fila FIFO para substituição de páginas
    
    def allocate_page(self, process_id, page_number):
        if process_id not in self.page_table:
            self.page_table[process_id] = {}
        
        if page_number in self.page_table[process_id]:
            print(f"Página {page_number} do processo {process_id} já está na memória.")
            return
        
        if len(self.frames) < self.num_frames:
            frame_number = len(self.frames)
            self.frames[frame_number] = (process_id, page_number)
            self.queue.append(frame_number)
            self.page_table[process_id][page_number] = frame_number
            print(f"Página {page_number} do processo {process_id} carregada no quadro {frame_number}.")
        else:
            self.replace_page(process_id, page_number)
    
    def replace_page(self, process_id, page_number):
        old_frame = self.queue.popleft()
        old_process, old_page = self.frames[old_frame]
        
        del self.page_table[old_process][old_page]
        self.frames[old_frame] = (process_id, page_number)
        self.page_table[process_id][page_number] = old_frame
        self.queue.append(old_frame)
        
        print(f"Página {old_page} do processo {old_process} substituída pela página {page_number} do processo {process_id} no quadro {old_frame}.")
    
    def display_memory(self):
        print("\nEstado Atual da Memória Física:")
        for frame, (proc, page) in self.frames.items():
            print(f"Quadro {frame}: Processo {proc}, Página {page}")
        print("\nTabelas de Páginas:")
        for proc, pages in self.page_table.items():
            print(f"Processo {proc}: {pages}")
        print()

# Exemplo de uso
memory = MemoryManager(num_frames=3)
memory.allocate_page(1, 0)
memory.allocate_page(1, 1)
memory.allocate_page(2, 0)
memory.display_memory()
memory.allocate_page(3, 0)  # Causa substituição
memory.display_memory()
memory.allocate_page(1, 2)  # Outra substituição
memory.display_memory()
