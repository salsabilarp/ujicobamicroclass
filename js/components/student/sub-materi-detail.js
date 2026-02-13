// =============== SUB MATERI DETAIL ===============
window.renderSubMateriDetail = renderSubMateriDetail;

function renderSubMateriDetail() {
    const sub = state.currentSubMateri;
    const progress = getProgress(state.currentUser.id);
    const completedSubs = progress ? parseJSON(progress.completedSubMateri) : [];
    const isCompleted = completedSubs.includes(sub?.id);
    
    // Jika tidak ada data sub materi, kembali ke halaman materi
    if (!sub) {
        state.studentSubView = 'materi';
        render();
        return;
    }

    return `
        <div class="animate-fade max-w-4xl mx-auto px-4 md:px-0">
            <!-- Breadcrumb Navigation -->
            <div class="flex flex-wrap items-center gap-2 text-sm mb-6">
                <button onclick="window.handleBackToMateri()" 
                class="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:gap-3 shadow-sm">
                    <span>←</span>
                    <span>Kembali ke Materi</span>
                </button>
            </div>

            <!-- Header Sub Materi - FINAL OPTIMIZED VERSION -->
<div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl md:rounded-2xl p-3 md:p-6 text-white mb-3 md:mb-4 shadow-lg">
    <div class="flex items-center gap-2 md:gap-4">
        <!-- Icon - lebih kecil di mobile -->
        <div class="w-10 h-10 md:w-16 md:h-16 bg-white/20 rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-3xl backdrop-blur flex-shrink-0">
            📖
        </div>
        
        <!-- Container untuk judul dan status -->
        <div class="flex-1 min-w-0 flex items-start justify-between gap-2">
            <!-- Judul dan materi -->
            <div class="flex-1 min-w-0">
                <h1 class="text-sm md:text-xl font-bold break-words line-clamp-2 leading-tight md:leading-normal">
                    ${escapeHtml(sub.title)}
                </h1>
                <div class="flex items-center gap-1 mt-0.5 md:mt-1">
                    <span class="text-[10px] md:text-xs bg-white/10 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full truncate max-w-[150px] md:max-w-none">
                        📚 ${escapeHtml(sub.materiTitle || 'Materi')}
                    </span>
                </div>
            </div>
            
            <!-- Status Badge - sangat compact di mobile -->
            <div class="flex-shrink-0">
                ${isCompleted ? `
                    <div class="bg-green-500 px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl font-semibold flex items-center gap-0.5 md:gap-1 shadow-md">
                        <span class="text-xs md:text-base">✅</span>
                        <span class="text-[10px] md:text-sm whitespace-nowrap hidden xs:inline">Selesai</span>
                        <span class="text-[10px] md:text-sm whitespace-nowrap inline xs:hidden">✓</span>
                    </div>
                ` : `
                    <div class="bg-yellow-500 px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl font-semibold flex items-center gap-0.5 md:gap-1 shadow-md">
                        <span class="text-xs md:text-base">🔓</span>
                        <span class="text-[10px] md:text-sm whitespace-nowrap hidden xs:inline">Belum</span>
                        <span class="text-[10px] md:text-sm whitespace-nowrap inline xs:hidden">🔓</span>
                    </div>
                `}
            </div>
        </div>
    </div>
</div>

            <div class="space-y-6">
                <!-- Video Section -->
                ${sub.videoId ? `
                    <div class="bg-white rounded-2xl card-shadow overflow-hidden">
                        <div class="p-4 md:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <h2 class="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                                <span class="text-2xl">🎬</span>
                                <span>Video</span>
                                <span class="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full ml-2">${escapeHtml(sub.title)}</span>
                            </h2>
                        </div>
                        <div class="p-4 md:p-6">
                            <div class="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
                                <div class="relative" style="padding-bottom: 56.25%;">
                                    <iframe 
                                        class="absolute top-0 left-0 w-full h-full"
                                        src="https://www.youtube.com/embed/${sub.videoId}?enablejsapi=1&origin=${window.location.origin}"
                                        frameborder="0"
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                        title="Video Pembelajaran: ${escapeHtml(sub.title)}">
                                    </iframe>
                                </div>
                            </div>
                            <p class="text-sm text-gray-500 mt-3 flex items-center gap-2">
                                <span>📺</span>
                                <span>Klik play untuk memulai video pembelajaran</span>
                            </p>
                        </div>
                    </div>
                ` : ''}

                <!-- LKPD Section -->
                ${sub.lkpdTitle ? `
                    <div class="bg-white rounded-2xl card-shadow overflow-hidden">
                        <div class="p-4 md:p-6 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-yellow-50">
                            <h2 class="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                                <span class="text-2xl">📋</span>
                                <span>LKPD</span>
                                <span class="text-xs px-2 py-1 bg-amber-100 text-amber-600 rounded-full ml-2">${escapeHtml(sub.title)}</span>
                            </h2>
                        </div>
                        <div class="p-4 md:p-6">
                            <div class="bg-amber-50 rounded-xl p-6 border-2 border-amber-200 hover:border-amber-300 transition-all">
                                <div class="flex flex-col md:flex-row gap-6">
                            
                                    <div class="flex-1 min-w-0">
                                        <!-- Judul LKPD dengan label yang jelas -->
                                        <div class="mb-4">
                                            <span class="text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                                                Lembar Kerja Peserta Didik
                                            </span>
                                    
                                        </div>
                                        
                                        <!-- Deskripsi LKPD dengan word wrap yang benar -->
                                        <div class="bg-white rounded-lg p-5 border border-amber-100 mb-5">
                                            <p class="text-gray-700 whitespace-pre-wrap break-words leading-relaxed" style="word-wrap: break-word; overflow-wrap: break-word;">
                                                ${escapeHtml(sub.lkpdDescription || 'Tidak ada deskripsi untuk LKPD ini.')}
                                            </p>
                                        </div>
                                        
                                        <!-- Tombol Tandai Selesai -->
                                        ${!isCompleted ? `
                                            <button 
                                                onclick="window.handleMarkSubMateriCompleted('${sub.id}')"
                                                class="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                                                <span class="text-xl">✅</span>
                                                <span>Tandai Selesai</span>
                                                <span class="text-xs bg-white/20 px-2 py-1 rounded-full ml-2">Sub Materi</span>
                                            </button>
                                        ` : `
                                            <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl font-semibold">
                                                <span class="text-xl">✅</span>
                                                <span>Sudah Selesai</span>
                                                <span class="text-xs bg-green-200 px-2 py-1 rounded-full ml-2">${escapeHtml(sub.title)}</span>
                                            </div>
                                        `}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ` : `
                    <!-- Jika tidak ada LKPD, tampilkan tombol selesai saja -->
                    ${!isCompleted ? `
                        <div class="bg-white rounded-2xl card-shadow p-6 md:p-8 text-center">
                            <div class="text-5xl mb-4">🎉</div>
                            <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-3">Selesaikan Materi Ini</h3>
                            <p class="text-gray-600 mb-6 max-w-lg mx-auto">
                                ${sub.videoId ? 'Tonton video pembelajaran di atas, lalu tandai sebagai selesai.' : 'Klik tombol di bawah untuk menandai materi ini selesai.'}
                            </p>
                            <button 
                                onclick="window.handleMarkSubMateriCompleted('${sub.id}')"
                                class="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-semibold inline-flex items-center gap-3 shadow-lg hover:shadow-xl">
                                <span class="text-2xl">✅</span>
                                <span class="text-lg">Tandai Selesai</span>
                                <span class="text-sm bg-white/20 px-3 py-1 rounded-full">${escapeHtml(sub.title)}</span>
                            </button>
                        </div>
                    ` : ''}
                `}
            </div>
        </div>
    `;
}

// Handler untuk kembali ke halaman materi (global function)
window.handleBackToMateri = function() {
    state.studentSubView = 'materi';
    state.currentSubMateri = null; // Hapus data sub materi dari state
    render();
};

// Handler untuk menandai sub materi selesai (global function)
window.handleMarkSubMateriCompleted = function(subId) {
    markSubMateriCompleted(subId);
    showToast('Sub materi ditandai selesai!');
    
    // Update state dan render ulang
    setTimeout(() => {
        render();
    }, 100);
};

// Fungsi untuk menandai sub materi selesai
function markSubMateriCompleted(subId) {
    const progress = getProgress(state.currentUser.id);
    const completedSubs = progress ? parseJSON(progress.completedSubMateri) : [];
    const completedLkpd = progress ? parseJSON(progress.completedLkpd) : [];

    if (!completedSubs.includes(subId)) {
        completedSubs.push(subId);
    }
    
    const sub = store.getById(subId);
    if (sub?.lkpdTitle && !completedLkpd.includes(subId)) {
        completedLkpd.push(subId);
    }

    if (progress) {
        store.update(progress.id, {
            completedSubMateri: JSON.stringify(completedSubs),
            completedLkpd: JSON.stringify(completedLkpd)
        });
    } else {
        store.create({
            type: 'progress',
            studentId: state.currentUser.id,
            completedSubMateri: JSON.stringify(completedSubs),
            completedLkpd: JSON.stringify(completedLkpd),
            pretestDone: false,
            posttestDone: false
        });
    }
}