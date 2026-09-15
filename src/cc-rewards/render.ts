import { CreditCard, EngineResult, SpendGroup, SpendTarget } from './types';
import { SPEND_TARGETS, getSpendTargetDisplayLabel, getSpendTargetShortTitle } from './data/spend-targets';
import { CREDIT_CARDS } from './data/cards';
import { rankCards } from './engine';
import { getSelectedCardIds, saveSelectedCardIds } from './storage';

export function renderApp(container: HTMLElement) {
  let activeTab: 'rewards' | 'movies' | 'lounges' | 'golf' = 'rewards';
  let selectedTargetId: string = 'swiggy';
  let transactionAmount: number = 1000;
  let activeCardIds: string[] = getSelectedCardIds(CREDIT_CARDS);

  function getActiveTarget(): SpendTarget {
    return SPEND_TARGETS.find((t) => t.id === selectedTargetId) || SPEND_TARGETS[0];
  }

  function getWalletButtonLabel(): string {
    if (activeCardIds.length === 0) return 'No Cards Selected';
    if (activeCardIds.length === CREDIT_CARDS.length) return `All Cards (${CREDIT_CARDS.length})`;
    if (activeCardIds.length === 1) {
      const card = CREDIT_CARDS.find((c) => c.id === activeCardIds[0]);
      return card ? card.name : '1 Card Selected';
    }
    return `${activeCardIds.length} of ${CREDIT_CARDS.length} Cards Selected`;
  }

  function renderWalletDropdown(): string {
    return `
      <div class="dropdown custom-multiselect position-relative" id="wallet-dropdown-wrapper">
        <button
          class="form-select text-start d-flex justify-content-between align-items-center w-100"
          type="button"
          id="wallet-dropdown-btn"
          aria-expanded="false"
        >
          <span class="text-truncate me-2" id="wallet-btn-label">${getWalletButtonLabel()}</span>
          <span class="badge ${activeCardIds.length > 0 ? 'bg-primary' : 'bg-secondary'} ms-1 flex-shrink-0" id="wallet-btn-badge">
            ${activeCardIds.length}
          </span>
        </button>

        <div
          class="dropdown-menu dropdown-menu-end shadow-lg p-3"
          id="wallet-dropdown-menu"
        >
          <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
            <span class="small fw-bold text-muted text-uppercase">Select Cards You Own</span>
            <div class="d-flex gap-2">
              <button id="btn-select-all" type="button" class="btn btn-link btn-sm p-0 text-decoration-none small fw-semibold">
                Select All
              </button>
              <span class="text-muted small">&bull;</span>
              <button id="btn-clear-all" type="button" class="btn btn-link btn-sm p-0 text-decoration-none small text-danger fw-semibold">
                Clear
              </button>
            </div>
          </div>

          <div class="d-flex flex-column gap-1 pt-1" id="wallet-items-list">
            ${CREDIT_CARDS.map((card) => {
      const isChecked = activeCardIds.includes(card.id);
      return `
                <label class="dropdown-item d-flex align-items-center justify-content-between rounded-2 cursor-pointer ${isChecked ? 'active-item' : ''}">
                  <div class="d-flex align-items-center gap-2 me-2">
                    <input
                      type="checkbox"
                      class="form-check-input mt-0 card-wallet-toggle flex-shrink-0"
                      value="${card.id}"
                      ${isChecked ? 'checked' : ''}
                    />
                    <span class="small fw-semibold card-item-name">${card.name}</span>
                  </div>
                  <span class="badge bg-body-tertiary text-body border small flex-shrink-0 ms-auto">${card.bank}</span>
                </label>
              `;
    }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function update() {
    container.innerHTML = `
      <!-- Navigation Tabs & Global Wallet Bar -->
      <div class="d-flex flex-column flex-lg-row justify-content-between align-items-stretch align-items-lg-center mb-4 gap-3">
        <!-- Navigation Tabs -->
        <ul class="nav nav-pills cc-nav-pills mb-0 gap-2" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link ${activeTab === 'rewards' ? 'active' : ''}" id="tab-btn-rewards" type="button" role="tab">
              🎯 Rewards Optimizer
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link ${activeTab === 'movies' ? 'active' : ''}" id="tab-btn-movies" type="button" role="tab">
              🎬 Movie Offers
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link ${activeTab === 'lounges' ? 'active' : ''}" id="tab-btn-lounges" type="button" role="tab">
              ✈️ Lounge Access
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link ${activeTab === 'golf' ? 'active' : ''}" id="tab-btn-golf" type="button" role="tab">
              🏌️ Golf Privileges
            </button>
          </li>
        </ul>

        <!-- Global Active Wallet Dropdown -->
        <div class="d-flex align-items-center gap-2 align-self-stretch align-self-lg-auto cc-wallet-bar-wrapper">
          <label class="form-label fw-bold small text-uppercase text-muted mb-0 text-nowrap">
            💳 My Wallet:
          </label>
          <div class="flex-grow-1 position-relative">
            ${renderWalletDropdown()}
          </div>
        </div>
      </div>

      <!-- Tab Content Area -->
      <div class="tab-content" id="ccTabContent">
        ${activeTab === 'rewards' ? renderRewardsTab() : ''}
        ${activeTab === 'movies' ? renderMoviesTab() : ''}
        ${activeTab === 'lounges' ? renderLoungesTab() : ''}
        ${activeTab === 'golf' ? renderGolfTab() : ''}
      </div>
    `;

    bindTabEvents();
    bindWalletEvents();
    if (activeTab === 'rewards') {
      bindRewardsEvents();
    }
  }

  // --- TAB 1: REWARDS OPTIMIZER ---
  function renderRewardsTab(): string {
    const activeTarget = getActiveTarget();
    const rankedResults: EngineResult[] = rankCards(CREDIT_CARDS, activeTarget, transactionAmount, activeCardIds);

    const popularMerchants = SPEND_TARGETS.filter((t) => t.group === SpendGroup.POPULAR_MERCHANTS);
    const mccCategories = SPEND_TARGETS.filter((t) => t.group === SpendGroup.CATEGORIES);

    return `
      <!-- Optimizer Input Card (2-Column Toolbar) -->
      <div class="cc-input-card p-3 p-md-4 mb-4">
        <div class="row g-3 align-items-start">
          <!-- Column 1: Merchant / Category Dropdown -->
          <div class="col-12 col-md-7">
            <label for="merchant-select" class="form-label fw-bold small text-uppercase text-muted mb-1">
              Merchant / Category (with MCC):
            </label>
            <select id="merchant-select" class="form-select">
              <optgroup label="🛍️ Popular Merchants">
                ${popularMerchants
        .map(
          (m) => `
                    <option value="${m.id}" ${m.id === selectedTargetId ? 'selected' : ''}>
                      ${getSpendTargetDisplayLabel(m)}
                    </option>
                  `
        )
        .join('')}
              </optgroup>
              <optgroup label="🏷️ Categories with 4-Digit MCC Codes">
                ${mccCategories
        .map(
          (c) => `
                    <option value="${c.id}" ${c.id === selectedTargetId ? 'selected' : ''}>
                      ${getSpendTargetDisplayLabel(c)}
                    </option>
                  `
        )
        .join('')}
              </optgroup>
            </select>
            <div class="form-text small mt-1 text-muted">
              Select specific brand or broad MCC category
            </div>
          </div>

          <!-- Column 2: Transaction Amount Input -->
          <div class="col-12 col-md-5">
            <label for="amount-input" class="form-label fw-bold small text-uppercase text-muted mb-1">
              Transaction Amount:
            </label>
            <div class="input-group mb-2">
              <span class="input-group-text fw-bold">₹</span>
              <input
                type="number"
                id="amount-input"
                class="form-control"
                placeholder="Enter amount"
                min="1"
                step="100"
                value="${transactionAmount}"
              />
            </div>
            <!-- Quick Amount Chips -->
            <div class="d-flex gap-1 flex-wrap">
              <button type="button" class="btn btn-outline-secondary btn-sm quick-amt-btn" data-amt="500">₹500</button>
              <button type="button" class="btn btn-outline-secondary btn-sm quick-amt-btn" data-amt="1000">₹1k</button>
              <button type="button" class="btn btn-outline-secondary btn-sm quick-amt-btn" data-amt="2500">₹2.5k</button>
              <button type="button" class="btn btn-outline-secondary btn-sm quick-amt-btn" data-amt="5000">₹5k</button>
              <button type="button" class="btn btn-outline-secondary btn-sm quick-amt-btn" data-amt="10000">₹10k</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Ranked Results Section -->
      <div class="mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h5 class="mb-0 fw-bold" id="ranked-results-title">
            Recommended Cards for ${getSpendTargetShortTitle(activeTarget)}
          </h5>
          <span class="text-muted small">Ranked by highest net INR return</span>
        </div>

        <div id="ranked-results-container">
          ${activeCardIds.length === 0
        ? `
            <div class="card border-0 shadow-sm rounded-4 p-5 text-center bg-body-tertiary">
              <div class="fs-1 mb-3">💳</div>
              <h5 class="fw-bold text-body">No Cards Selected in Your Wallet</h5>
              <p class="text-muted mb-0 mx-auto" style="max-width: 500px;">
                Please select at least one card in the <strong>My Wallet</strong> dropdown above to calculate net rewards and card recommendations.
              </p>
            </div>
          `
        : renderRankedCardsList(rankedResults, activeTarget)
      }
        </div>
      </div>
    `;
  }

  function renderRankedCardsList(results: EngineResult[], target: SpendTarget = getActiveTarget()): string {
    const isForex = target.id === 'forex-international';

    return `
      <div class="row g-3">
        ${results
        .map((res, index) => {
          const isBest = res.isBest;
          const card = res.card;
          const colClass = isBest ? 'col-12' : 'col-12 col-lg-6';

          return `
            <div class="${colClass}">
              <div class="result-card h-100 ${isBest ? 'is-best' : ''}">
                ${isBest ? `<div class="best-badge">★ Best Recommendation</div>` : ''}

                <div class="d-flex justify-content-between align-items-start flex-wrap gap-3">
                  <!-- Left: Card Info -->
                  <div style="max-width: 65%;">
                    <div class="d-flex align-items-center gap-2 mb-1">
                      <span class="badge bg-secondary-subtle text-secondary-emphasis border">
                        #${index + 1}
                      </span>
                      <span class="badge bg-primary-subtle text-primary-emphasis border">
                        ${card.bank}
                      </span>
                      <span class="badge bg-body-tertiary text-body border">
                        ${card.network}
                      </span>
                      ${card.badge ? `<span class="badge bg-dark-subtle text-body border small">${card.badge}</span>` : ''}
                    </div>

                    <h5 class="fw-bold mb-1">
                      ${card.cardPageUrl ? `<a href="${card.cardPageUrl}" target="_blank" rel="noopener noreferrer" class="text-decoration-none text-reset">${card.name} ↗</a>` : card.name}
                    </h5>

                    <!-- Notes & Disclaimers -->
                    <div class="mt-2 small text-muted">
                      ${res.notes.map((note) => `<div class="mb-1">&bull; ${note}</div>`).join('')}
                    </div>
                  </div>

                  <!-- Right: Reward Rate & Value -->
                  <div class="text-end">
                    <div class="text-muted small text-uppercase fw-semibold mb-1">
                      ${isForex ? 'Forex Markup Fee' : 'Net Reward Return'}
                    </div>
                    ${isForex && res.forexMarkupFeeInr !== undefined
              ? `
                        <div class="return-amount ${card.forexMarkupPercentage === 0 ? 'text-success' : 'text-danger'}">
                          ${card.forexMarkupPercentage === 0 ? '₹0 Fee (Zero Forex)' : `+₹${res.forexMarkupFeeInr.toLocaleString('en-IN')}`}
                        </div>
                        <div class="mt-1">
                          ${card.forexMarkupPercentage === 0
                ? `<span class="badge bg-success-subtle text-success border fw-bold rate-badge">0% Forex Markup</span>`
                : `<span class="badge bg-warning-subtle text-warning-emphasis border fw-bold rate-badge">${card.forexMarkupPercentage}% + GST Markup</span>`
              }
                        </div>
                      `
              : `
                        <div class="return-amount ${res.isExcluded ? 'text-danger' : 'text-success'}">
                          ${res.isExcluded ? '₹0' : `₹${res.grossRewardInr.toLocaleString('en-IN')}`}
                        </div>
                        <div class="mt-1">
                          ${res.isExcluded
                ? `<span class="badge badge-excluded">0% Excluded</span>`
                : `<span class="badge bg-success-subtle text-success border fw-bold rate-badge">${res.effectiveRatePercentage}% Return</span>`
              }
                        </div>
                      `
            }
                    ${!res.isExcluded && res.pointsEarned > 0 && card.pointConversionInr !== 1.0
              ? `<div class="text-muted small mt-1">~${res.pointsEarned.toLocaleString('en-IN')} pts (1 pt = ₹${card.pointConversionInr})</div>`
              : ''
            }
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join('')}
      </div>
    `;
  }

  // --- TAB 2: MOVIE OFFERS ---
  function renderMoviesTab(): string {
    const activeCards = CREDIT_CARDS.filter((c) => activeCardIds.includes(c.id));
    const movieCards = activeCards.filter((c) => c.movieBenefit !== null);

    return `
      <div class="mb-4">
        <div class="text-center mb-4">
          <h3 class="fw-bold">🎬 Credit Card Movie Offers & Vouchers</h3>
          <p class="text-muted">Directly compare BOGO tickets, discounts, and quotas across your active wallet cards in one place.</p>
        </div>

        <div class="row g-4">
          ${activeCardIds.length === 0
        ? `
              <div class="col-12">
                <div class="card border-0 shadow-sm rounded-4 p-5 text-center bg-body-tertiary">
                  <div class="fs-1 mb-3">🎬</div>
                  <h5 class="fw-bold text-body">No Cards Selected in Your Wallet</h5>
                  <p class="text-muted mb-0 mx-auto" style="max-width: 500px;">
                    Please select at least one card in the <strong>My Wallet</strong> dropdown above to view complimentary movie tickets, BOGO offers, and platform discounts.
                  </p>
                </div>
              </div>
            `
        : movieCards.length === 0
          ? `
              <div class="col-12">
                <div class="card border-0 shadow-sm rounded-4 p-5 text-center bg-body-tertiary">
                  <div class="fs-1 mb-3">🎬</div>
                  <h5 class="fw-bold text-body">No Movie Offers in Your Wallet</h5>
                  <p class="text-muted mb-0 mx-auto" style="max-width: 500px;">
                    None of your currently selected cards feature complimentary movie or voucher benefits. As you add cards that feature BookMyShow/PVR BOGO or discounts, they will appear here.
                  </p>
                </div>
              </div>
            `
          : movieCards
            .map((card) => {
              const movie = card.movieBenefit!;
              return `
              <div class="col-12 col-md-6 col-xl-4">
                <div class="benefit-card">
                  <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <span class="badge bg-primary-subtle text-primary border me-1">${card.bank}</span>
                      <span class="badge bg-danger-subtle text-danger border">${movie.platform}</span>
                    </div>
                    <span class="badge bg-warning-subtle text-warning-emphasis border fw-bold">
                      ${movie.offerType}
                    </span>
                  </div>

                  <h5 class="fw-bold mb-2">${card.name}</h5>

                  <div class="p-3 bg-body-tertiary rounded-3 mb-3 border">
                    <div class="fw-bold text-primary mb-1">${movie.description}</div>
                    ${movie.monthlyQuota ? `<div class="small text-muted"><strong>Monthly Quota:</strong> ${movie.monthlyQuota}</div>` : ''}
                  </div>

                  ${movie.conditions
                  ? `
                    <div class="small text-muted mb-3">
                      <strong>Conditions:</strong> ${movie.conditions}
                    </div>
                  `
                  : ''
                }

                  <div class="benefit-card-footer">
                    ${movie.bookingUrl
                  ? `
                      <a href="${movie.bookingUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm w-100 fw-semibold">
                        Claim on ${movie.platform} ↗
                      </a>
                    `
                  : ''
                }
                  </div>
                </div>
              </div>
            `;
            })
            .join('')
      }
        </div>
      </div>
    `;
  }

  function sortLoungeCards(cards: CreditCard[]): CreditCard[] {
    return [...cards].sort((a, b) => {
      const loungeA = a.loungeBenefit!;
      const loungeB = b.loungeBenefit!;

      // 1. Primary: No spend condition (required === false) first, then with spend condition
      const condA = loungeA.spendCondition.required ? 1 : 0;
      const condB = loungeB.spendCondition.required ? 1 : 0;
      if (condA !== condB) {
        return condA - condB;
      }

      // 2. Secondary: Within each condition tier, unlimited visits first, then limited
      const isUnlimitedA =
        loungeA.domesticVisits.toLowerCase().includes('unlimited') ||
        loungeA.internationalVisits.toLowerCase().includes('unlimited');
      const isUnlimitedB =
        loungeB.domesticVisits.toLowerCase().includes('unlimited') ||
        loungeB.internationalVisits.toLowerCase().includes('unlimited');

      if (isUnlimitedA !== isUnlimitedB) {
        return isUnlimitedA ? -1 : 1;
      }

      // 3. Tertiary: For conditional cards, lower spend threshold first
      const threshA = loungeA.spendCondition.thresholdInr ?? 0;
      const threshB = loungeB.spendCondition.thresholdInr ?? 0;
      if (threshA !== threshB) {
        return threshA - threshB;
      }

      return a.name.localeCompare(b.name);
    });
  }

  // --- TAB 3: LOUNGE ACCESS DIRECTORY ---
  function renderLoungesTab(): string {
    const activeCards = CREDIT_CARDS.filter((c) => activeCardIds.includes(c.id));
    const loungeCards = sortLoungeCards(activeCards.filter((c) => c.loungeBenefit !== null));

    return `
      <div class="mb-4">
        <div class="text-center mb-4">
          <h3 class="fw-bold">✈️ Airport & Railway Lounge Access Guide</h3>
          <p class="text-muted">Check domestic/international quotas, latest spend conditions, access methods, and official lounge lists for your active cards.</p>
        </div>

        <div class="row g-4">
          ${activeCardIds.length === 0
        ? `
              <div class="col-12">
                <div class="card border-0 shadow-sm rounded-4 p-5 text-center bg-body-tertiary">
                  <div class="fs-1 mb-3">✈️</div>
                  <h5 class="fw-bold text-body">No Cards Selected in Your Wallet</h5>
                  <p class="text-muted mb-0 mx-auto" style="max-width: 500px;">
                    Please select at least one card in the <strong>My Wallet</strong> dropdown above to view airport and railway lounge access quotas and spend criteria.
                  </p>
                </div>
              </div>
            `
        : loungeCards.length === 0
          ? `
              <div class="col-12">
                <div class="card border-0 shadow-sm rounded-4 p-5 text-center bg-body-tertiary">
                  <div class="fs-1 mb-3">✈️</div>
                  <h5 class="fw-bold text-body">No Lounge Access in Your Wallet</h5>
                  <p class="text-muted mb-0 mx-auto" style="max-width: 500px;">
                    None of your currently selected cards feature complimentary airport or railway lounge access.
                  </p>
                </div>
              </div>
            `
          : loungeCards
            .map((card) => {
              const lounge = card.loungeBenefit!;
              const isUnconditional = !lounge.spendCondition.required;

              return `
              <div class="col-12 col-md-6 col-xl-4">
                <div class="benefit-card">
                  <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <span class="badge bg-primary-subtle text-primary border me-1">${card.bank}</span>
                      <span class="badge bg-body-tertiary text-body border">${card.network}</span>
                    </div>
                    <span class="badge ${isUnconditional ? 'badge-unconditional' : 'badge-conditional'}">
                      ${isUnconditional ? '✓ No Spend Required' : '⚠️ Spend Condition'}
                    </span>
                  </div>

                  <h5 class="fw-bold mb-3">${card.name}</h5>

                  <!-- Visit Quotas -->
                  <div class="row g-2 mb-3">
                    <div class="col-6">
                      <div class="p-2 border rounded-2 bg-body-tertiary text-center">
                        <div class="small text-muted text-uppercase fw-semibold">Domestic</div>
                        <div class="fw-bold fs-6">${lounge.domesticVisits}</div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="p-2 border rounded-2 bg-body-tertiary text-center">
                        <div class="small text-muted text-uppercase fw-semibold">International</div>
                        <div class="fw-bold fs-6">${lounge.internationalVisits}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Eligibility Condition -->
                  <div class="p-3 bg-body-tertiary rounded-3 mb-3 border">
                    <div class="small fw-bold mb-1">Eligibility Criteria:</div>
                    <div class="small text-muted">${lounge.spendCondition.description}</div>
                  </div>

                  <!-- Access Method -->
                  <div class="small text-muted mb-3">
                    <strong>Access Method:</strong> ${lounge.accessMethod}
                    ${lounge.notes ? `<div class="mt-1 small">&bull; ${lounge.notes}</div>` : ''}
                  </div>

                  <div class="benefit-card-footer d-flex gap-2">
                    ${lounge.loungeListUrl
                  ? `
                      <a href="${lounge.loungeListUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary btn-sm flex-fill fw-semibold">
                        Lounge List ↗
                      </a>
                    `
                  : ''
                }
                    ${lounge.voucherPortalUrl
                  ? `
                      <a href="${lounge.voucherPortalUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm flex-fill fw-semibold">
                        Generate QR / Voucher ↗
                      </a>
                    `
                  : ''
                }
                  </div>
                </div>
              </div>
            `;
            })
            .join('')
      }
        </div>
      </div>
    `;
  }

  // --- TAB 4: GOLF PRIVILEGES ---
  function renderGolfTab(): string {
    const activeCards = CREDIT_CARDS.filter((c) => activeCardIds.includes(c.id));
    const golfCards = activeCards.filter((c) => c.golfBenefit !== null);

    return `
      <div class="mb-4">
        <div class="text-center mb-4">
          <h3 class="fw-bold">🏌️ Complimentary Golf Privileges</h3>
          <p class="text-muted">Compare complimentary golf games and coaching lessons across your active credit cards.</p>
        </div>

        <div class="row g-4">
          ${activeCardIds.length === 0
        ? `
              <div class="col-12">
                <div class="card border-0 shadow-sm rounded-4 p-5 text-center bg-body-tertiary">
                  <div class="fs-1 mb-3">🏌️</div>
                  <h5 class="fw-bold text-body">No Cards Selected in Your Wallet</h5>
                  <p class="text-muted mb-0 mx-auto" style="max-width: 500px;">
                    Please select at least one card in the <strong>My Wallet</strong> dropdown above to view complimentary golf games and lessons.
                  </p>
                </div>
              </div>
            `
        : golfCards.length === 0
          ? `
              <div class="col-12">
                <div class="card border-0 shadow-sm rounded-4 p-5 text-center bg-body-tertiary">
                  <div class="fs-1 mb-3">🏌️</div>
                  <h5 class="fw-bold text-body">No Golf Privileges in Your Wallet</h5>
                  <p class="text-muted mb-0 mx-auto" style="max-width: 500px;">
                    None of your currently selected cards feature complimentary golf privileges or coaching lessons.
                  </p>
                </div>
              </div>
            `
          : golfCards
            .map((card) => {
              const golf = card.golfBenefit!;
              const isUnconditional = !golf.spendCondition?.required;

              return `
              <div class="col-12 col-md-6 col-xl-4">
                <div class="benefit-card">
                  <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <span class="badge bg-primary-subtle text-primary border me-1">${card.bank}</span>
                      <span class="badge bg-body-tertiary text-body border">${card.network}</span>
                    </div>
                    <span class="badge ${isUnconditional ? 'badge-unconditional' : 'badge-conditional'}">
                      ${isUnconditional ? '✓ No Spend Required' : '⚠️ Spend Condition'}
                    </span>
                  </div>

                  <h5 class="fw-bold mb-3">${card.name}</h5>

                  <!-- Quota Blocks -->
                  <div class="row g-2 mb-3">
                    <div class="col-6">
                      <div class="p-2 border rounded-2 bg-body-tertiary text-center">
                        <div class="small text-muted text-uppercase fw-semibold">Golf Games</div>
                        <div class="fw-bold fs-6">${golf.gamesPerQuarter} / quarter</div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="p-2 border rounded-2 bg-body-tertiary text-center">
                        <div class="small text-muted text-uppercase fw-semibold">Lessons</div>
                        <div class="fw-bold fs-6">${golf.lessonsPerQuarter ? `${golf.lessonsPerQuarter} / quarter` : 'N/A'}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Details & Description -->
                  <div class="p-3 bg-body-tertiary rounded-3 mb-3 border">
                    <div class="small fw-bold mb-1">Benefit Details:</div>
                    <div class="small text-muted">${golf.description}</div>
                  </div>

                  <!-- Notes -->
                  ${golf.notes ? `<div class="small text-muted mb-3">&bull; ${golf.notes}</div>` : ''}

                  <!-- Action Footer -->
                  <div class="benefit-card-footer mt-auto">
                    ${golf.bookingUrl
                  ? `
                      <a href="${golf.bookingUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm w-100 fw-semibold">
                        Book Golf Slot ↗
                      </a>
                    `
                  : ''
                }
                  </div>
                </div>
              </div>
            `;
            })
            .join('')
      }
        </div>
      </div>
    `;
  }

  // --- EVENT BINDINGS & DYNAMIC STATE ---
  function updateWalletButtonState() {
    const labelEl = document.getElementById('wallet-btn-label');
    const badgeEl = document.getElementById('wallet-btn-badge');
    if (labelEl) labelEl.textContent = getWalletButtonLabel();
    if (badgeEl) {
      badgeEl.textContent = activeCardIds.length.toString();
      badgeEl.className = `badge ${activeCardIds.length > 0 ? 'bg-primary' : 'bg-secondary'} ms-1 flex-shrink-0`;
    }
  }

  function refreshResultsOnly() {
    const target = getActiveTarget();
    const results = rankCards(CREDIT_CARDS, target, transactionAmount, activeCardIds);
    const containerEl = document.getElementById('ranked-results-container');
    const titleEl = document.getElementById('ranked-results-title');

    if (titleEl) {
      titleEl.textContent = `Recommended Cards for ${getSpendTargetShortTitle(target)}`;
    }

    if (containerEl) {
      if (activeCardIds.length === 0) {
        containerEl.innerHTML = `
          <div class="card border-0 shadow-sm rounded-4 p-5 text-center bg-body-tertiary">
            <div class="fs-1 mb-3">💳</div>
            <h5 class="fw-bold text-body">No Cards Selected in Your Wallet</h5>
            <p class="text-muted mb-0 mx-auto" style="max-width: 500px;">
              Please select at least one card in the <strong>My Wallet</strong> dropdown above to calculate net rewards and card recommendations.
            </p>
          </div>
        `;
      } else {
        containerEl.innerHTML = renderRankedCardsList(results, target);
      }
    }
  }

  function refreshCurrentTabContent() {
    if (activeTab === 'rewards') {
      refreshResultsOnly();
    } else if (activeTab === 'movies') {
      const tabContent = document.getElementById('ccTabContent');
      if (tabContent) {
        tabContent.innerHTML = renderMoviesTab();
      }
    } else if (activeTab === 'lounges') {
      const tabContent = document.getElementById('ccTabContent');
      if (tabContent) {
        tabContent.innerHTML = renderLoungesTab();
      }
    } else if (activeTab === 'golf') {
      const tabContent = document.getElementById('ccTabContent');
      if (tabContent) {
        tabContent.innerHTML = renderGolfTab();
      }
    }
  }

  function bindTabEvents() {
    const btnRewards = document.getElementById('tab-btn-rewards');
    const btnMovies = document.getElementById('tab-btn-movies');
    const btnLounges = document.getElementById('tab-btn-lounges');
    const btnGolf = document.getElementById('tab-btn-golf');

    btnRewards?.addEventListener('click', () => {
      activeTab = 'rewards';
      update();
    });
    btnMovies?.addEventListener('click', () => {
      activeTab = 'movies';
      update();
    });
    btnLounges?.addEventListener('click', () => {
      activeTab = 'lounges';
      update();
    });
    btnGolf?.addEventListener('click', () => {
      activeTab = 'golf';
      update();
    });
  }

  function bindWalletEvents() {
    const walletBtn = document.getElementById('wallet-dropdown-btn');
    const walletMenu = document.getElementById('wallet-dropdown-menu');
    const btnSelectAll = document.getElementById('btn-select-all');
    const btnClearAll = document.getElementById('btn-clear-all');

    // Toggle Multi-Select Dropdown
    walletBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const isShown = walletMenu?.classList.contains('show');
      if (isShown) {
        walletMenu?.classList.remove('show');
        walletBtn.setAttribute('aria-expanded', 'false');
      } else {
        walletMenu?.classList.add('show');
        walletBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Prevent clicks inside dropdown from bubbling and closing it
    walletMenu?.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Checkbox changes inside dropdown
    const checkboxes = container.querySelectorAll('.card-wallet-toggle') as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((cb) => {
      cb.addEventListener('change', () => {
        const cardId = cb.value;
        const labelItem = cb.closest('.dropdown-item');
        if (cb.checked) {
          if (!activeCardIds.includes(cardId)) {
            activeCardIds.push(cardId);
          }
          labelItem?.classList.add('active-item');
        } else {
          activeCardIds = activeCardIds.filter((id) => id !== cardId);
          labelItem?.classList.remove('active-item');
        }
        saveSelectedCardIds(activeCardIds);
        updateWalletButtonState();
        refreshCurrentTabContent();
      });
    });

    // Select All
    btnSelectAll?.addEventListener('click', (e) => {
      e.preventDefault();
      activeCardIds = CREDIT_CARDS.map((c) => c.id);
      saveSelectedCardIds(activeCardIds);
      checkboxes.forEach((cb) => {
        cb.checked = true;
        cb.closest('.dropdown-item')?.classList.add('active-item');
      });
      updateWalletButtonState();
      refreshCurrentTabContent();
    });

    // Clear All
    btnClearAll?.addEventListener('click', (e) => {
      e.preventDefault();
      activeCardIds = [];
      saveSelectedCardIds(activeCardIds);
      checkboxes.forEach((cb) => {
        cb.checked = false;
        cb.closest('.dropdown-item')?.classList.remove('active-item');
      });
      updateWalletButtonState();
      refreshCurrentTabContent();
    });
  }

  function bindRewardsEvents() {
    const merchantSelect = document.getElementById('merchant-select') as HTMLSelectElement;
    const amountInput = document.getElementById('amount-input') as HTMLInputElement;

    // Merchant Select
    merchantSelect?.addEventListener('change', (e) => {
      selectedTargetId = (e.target as HTMLSelectElement).value;
      refreshResultsOnly();
    });

    // Amount Input
    amountInput?.addEventListener('input', (e) => {
      const val = parseFloat((e.target as HTMLInputElement).value);
      transactionAmount = isNaN(val) ? 0 : val;
      refreshResultsOnly();
    });

    // Quick Amount Buttons
    const quickAmtBtns = container.querySelectorAll('.quick-amt-btn');
    quickAmtBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const amt = parseFloat(btn.getAttribute('data-amt') || '1000');
        transactionAmount = amt;
        if (amountInput) {
          amountInput.value = amt.toString();
        }
        refreshResultsOnly();
      });
    });
  }

  // Close Dropdown on outside click (single document-level handler)
  document.addEventListener('click', (e) => {
    const walletWrapper = document.getElementById('wallet-dropdown-wrapper');
    const walletMenu = document.getElementById('wallet-dropdown-menu');
    const walletBtn = document.getElementById('wallet-dropdown-btn');
    if (walletWrapper && !walletWrapper.contains(e.target as Node)) {
      walletMenu?.classList.remove('show');
      walletBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  // Initial render
  update();
}
