@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title = $attributes['title'] ?? '';
	$subtitle = $attributes['subtitle'] ?? '';
	$privacyText = $attributes['privacyText'] ?? '';
	$marketingText = $attributes['marketingText'] ?? '';
	$buttonText = $attributes['buttonText'] ?? 'Book a Demo';

	$sectionClass = 'intouch ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
	$decorUrl = get_template_directory_uri() . '/assets/img/decor/oneflow_dec_1.jpg';
	$buttonIcon = get_template_directory_uri() . '/assets/img/icons/btn_2.svg';
	$successTitle = $attributes['successTitle'] ?? '';
	$successDesc  = $attributes['successDesc'] ?? '';

	$labelFirstName = function_exists( 'pll__' ) ? pll__( 'First name' )           : __( 'First name', 'overchain-blocks' );
	$labelLastName  = function_exists( 'pll__' ) ? pll__( 'Last name' )            : __( 'Last name', 'overchain-blocks' );
	$labelJobTitle  = function_exists( 'pll__' ) ? pll__( 'Job title' )            : __( 'Job title', 'overchain-blocks' );
	$labelEmail     = function_exists( 'pll__' ) ? pll__( 'Business email' )       : __( 'Business email', 'overchain-blocks' );
	$labelWebsite   = function_exists( 'pll__' ) ? pll__( 'Company Website' )      : __( 'Company Website', 'overchain-blocks' );
	$labelPhone     = function_exists( 'pll__' ) ? pll__( 'Phone' )                : __( 'Phone', 'overchain-blocks' );
	$labelMessage   = function_exists( 'pll__' ) ? pll__( 'Message' )              : __( 'Message', 'overchain-blocks' );
	$labelOptional  = function_exists( 'pll__' ) ? pll__( '(optional)' )           : __( '(optional)', 'overchain-blocks' );
	$phTypeHere     = function_exists( 'pll__' ) ? pll__( 'Type here' )            : __( 'Type here', 'overchain-blocks' );
	$plEnterYour    = function_exists( 'pll__' ) ? pll__( 'Enter your' )           : __( 'Enter your', 'overchain-blocks' );
	$plEmail        = function_exists( 'pll__' ) ? pll__( 'Email address' )        : __( 'Email address', 'overchain-blocks' );
	$plWebsite      = function_exists( 'pll__' ) ? pll__( 'Website URL' )          : __( 'Website URL', 'overchain-blocks' );
	$plPhone        = function_exists( 'pll__' ) ? pll__( 'Phone Number' )         : __( 'Phone Number', 'overchain-blocks' );
	$phJobTitle     = function_exists( 'pll__' ) ? pll__( 'CEO, designer, manager' ) : __( 'CEO, designer, manager', 'overchain-blocks' );
@endphp

<section id="form" class="{{ esc_attr( $sectionClass ) }}">
	<div class="intouch__container">
		<div class="intouch__wrap">
			<div class="intouch__decor no-select" aria-hidden="true">
				<img src="{{ esc_url( $decorUrl ) }}" alt="">
			</div>

			<div class="intouch__body section-body">
				<div class="heading aic">
					@if ( ! empty( $title ) )
						<h2 class="tl2">{!! wp_kses_post( $title ) !!}</h2>
					@endif

					@if ( ! empty( $subtitle ) )
						<div class="txt3 col-alt1">
							<p>{!! wp_kses_post( $subtitle ) !!}</p>
						</div>
					@endif
				</div>

				<form id="hsForm_45818287-de80-4423-86c5-faeaaec174ed" method="POST" accept-charset="UTF-8"
					enctype="multipart/form-data" novalidate
					action="https://forms-eu1.hsforms.com/submissions/v3/public/submit/formsnext/multipart/144737242/45818287-de80-4423-86c5-faeaaec174ed"
					class="base-form form-intouch submitForm hubSpotForm form__content hs-form-private hsForm_45818287-de80-4423-86c5-faeaaec174ed hs-form-45818287-de80-4423-86c5-faeaaec174ed hs-form-45818287-de80-4423-86c5-faeaaec174ed_20bb11ad-6121-4405-87b3-bf0999944443 hs-form stacked hs-custom-style"
					target="submission_handler_20bb11ad-6121-4405-87b3-bf0999944443-45818287-de80-4423-86c5-faeaaec174ed"
					data-instance-id="20bb11ad-6121-4405-87b3-bf0999944443"
					data-form-id="45818287-de80-4423-86c5-faeaaec174ed" data-portal-id="144737242"
					data-test-id="hsForm_45818287-de80-4423-86c5-faeaaec174ed" data-hs-cf-bound="true"
					data-success-modal="md-success"
					data-success-title="{{ esc_attr( $successTitle ) }}"
					data-success-desc="{{ esc_attr( $successDesc ) }}">

					<fieldset class="field-inputs form-columns-2">
						<div class="field-inputs__box hs_firstname hs-firstname hs-fieldtype-text field hs-form-field">
							<label id="label-firstname-20bb11ad-6121-4405-87b3-bf0999944443-6"
								placeholder="{{ $plEnterYour }} {{ $labelFirstName }}"
								for="firstname-20bb11ad-6121-4405-87b3-bf0999944443-6">
								<span>{{ $labelFirstName }}</span><span class="hs-form-required">*</span>
							</label>

							<legend class="hs-field-desc" style="display: none"></legend>

							<div class="input">
								<input id="firstname-20bb11ad-6121-4405-87b3-bf0999944443-6" name="0-1/firstname"
									required placeholder="{{ $phTypeHere }}" data-required="1" type="text" class="hs-input"
									autocomplete="given-name" value="" />
							</div>
						</div>

						<div class="field-inputs__box hs_lastname hs-lastname hs-fieldtype-text field hs-form-field">
							<label id="label-lastname-20bb11ad-6121-4405-87b3-bf0999944443-5"
								placeholder="{{ $plEnterYour }} {{ $labelLastName }}"
								for="lastname-20bb11ad-6121-4405-87b3-bf0999944443-5">
								<span>{{$labelLastName}}</span><span class="hs-form-required">*</span>
							</label>

							<legend class="hs-field-desc" style="display: none"></legend>

							<div class="input">
								<input id="lastname-20bb11ad-6121-4405-87b3-bf0999944443-5" name="0-1/lastname" required
									placeholder="{{ $phTypeHere }}" data-required="1" type="text" class="hs-input"
									autocomplete="family-name" value="" />
							</div>
						</div>
					</fieldset>

					<fieldset class="field-inputs form-columns-2">
						<div class="field-inputs__box hs_jobtitle hs-jobtitle hs-fieldtype-text field hs-form-field">
							<label id="label-jobtitle-20bb11ad-6121-4405-87b3-bf0999944443-3148088094473"
								placeholder="{{ $plEnterYour }} {{ $labelJobTitle }}"
								for="jobtitle-20bb11ad-6121-4405-87b3-bf0999944443-3148088094473">
								<span>{{ $labelJobTitle }}</span>
							</label>

							<legend class="hs-field-desc" style="display: none"></legend>

							<div class="input">
								<input id="jobtitle-20bb11ad-6121-4405-87b3-bf0999944443-3148088094473"
									name="0-1/jobtitle" placeholder="{{ $phJobTitle }}" type="text"
									class="hs-input" autocomplete="organization-title" value="" />
							</div>
						</div>

						<div class="field-inputs__box hs_email hs-email hs-fieldtype-text field hs-form-field">
							<label id="label-email-20bb11ad-6121-4405-87b3-bf0999944443-3"
								placeholder="{{ $plEnterYour }} {{ $plEmail }}"
								for="email-20bb11ad-6121-4405-87b3-bf0999944443-3">
								<span>{{ $labelEmail }}</span><span class="hs-form-required">*</span>
							</label>

							<legend class="hs-field-desc" style="display: none"></legend>

							<div class="input">
								<input id="email-20bb11ad-6121-4405-87b3-bf0999944443-3" name="0-1/email" required
									placeholder="example@email.com" data-required="1" type="email" class="hs-input"
									inputmode="email" autocomplete="email" value="" />
							</div>
						</div>
					</fieldset>

					<fieldset class="field-inputs form-columns-2">
						<div class="field-inputs__box hs_website hs-website hs-fieldtype-text field hs-form-field">
							<label id="label-website-20bb11ad-6121-4405-87b3-bf0999944443-3147563103814"
								placeholder="{{ $plEnterYour }} {{ $plEwbsite }}"
								for="website-20bb11ad-6121-4405-87b3-bf0999944443-3147563103814"
								data-optional="{{ $labelOptional }}">
								<span>{{ $labelWebsite }}</span>
							</label>

							<legend class="hs-field-desc" style="display: none"></legend>

							<div class="input">
								<input id="website-20bb11ad-6121-4405-87b3-bf0999944443-3147563103814"
									name="0-1/website" placeholder="example.company.com" type="text" class="hs-input"
									value="" />
							</div>
						</div>

						<div class="field-inputs__box hs_phone hs-phone hs-fieldtype-phonenumber field hs-form-field">
							<label id="label-phone-20bb11ad-6121-4405-87b3-bf0999944443-2972723625769" class=""
								placeholder="{{ $plEnterYour }} {{ $plPhone }}"
								for="phone-20bb11ad-6121-4405-87b3-bf0999944443-2972723625769">
								<span>{{ $labelPhone }}</span><span class="hs-form-required">*</span>
							</label>
							<legend class="hs-field-desc" style="display: none"></legend>
							<div class="input phone-wrapp">
								<div class="iti iti--allow-dropdown iti--separate-dial-code iti--show-flags">
									<div class="iti__flag-container">
										<div class="iti__selected-flag" role="combobox" aria-haspopup="listbox"
											aria-controls="iti-0__country-listbox" aria-owns="iti-0__country-listbox"
											aria-expanded="false" aria-label="Telephone country code" tabindex="0"
											title="Ukraine (Україна): +380">
											<div class="iti__flag iti__ua"></div>
											<div class="iti__selected-dial-code">
												+380
											</div>
											<div class="iti__arrow"></div>
										</div>
									</div>
									<input name="tel" required="" data-required="1" type="tel" class="hs-input" value=""
										autocomplete="off" data-intl-tel-input-id="0" placeholder="050 123 4567"
										style="padding-left: 95px" />
								</div>
							</div>
							<div style="display: none" class="input">
								<input id="phone-20bb11ad-6121-4405-87b3-bf0999944443-2972723625769" name="0-1/phone"
									required="" placeholder="+380" data-required="1" type="tel" class="hs-input"
									autocomplete="tel" value="+380" />
							</div>
						</div>
					</fieldset>

					<fieldset class="field-inputs form-columns-1">
						<div class="field-inputs__box hs_message hs-message hs-fieldtype-textarea field hs-form-field">
							<label id="label-message-20bb11ad-6121-4405-87b3-bf0999944443-3243183949179"
								placeholder="{{ $plEnterYour }} {{ $labelMessage }}"
								for="message-20bb11ad-6121-4405-87b3-bf0999944443-3243183949179"
								data-optional="{{ $labelOptional }}">
								<span class="qwe">
									{{ $labelMessage }}<span class="hs-form-required">*</span>
								</span>
							</label>

							<legend class="hs-field-desc" style="display: none"></legend>

							<div class="input">
								<textarea id="message-20bb11ad-6121-4405-87b3-bf0999944443-3243183949179"
									class="hs-input hs-fieldtype-textarea" name="0-1/message" placeholder="{{ $phTypeHere }}"
									data-required="1" rows="3"></textarea>
							</div>
						</div>
					</fieldset>

					<fieldset class="field-privacy form-columns-1">
						<div data-hsfc-id="DataPrivacyField" class="field-privacy__box hsfc-DataPrivacyField"
							id="a80f78bc-37c1-466e-8e88-587eff926e09-3247323563373">

							<div data-hsfc-id="Row" id="a80f78bc-37c1-466e-8e88-587eff926e09-3247323563373-sc-r0"
								class="hidden-elem hsfc-Row">
								<div data-hsfc-id="RichText"
									id="a80f78bc-37c1-466e-8e88-587eff926e09-3247323563373-sc-rt0-cc"
									class="hsfc-RichText">
									Overchain respects your privacy. We use your
									data only to manage your account and deliver the
									services you request. Occasionally, we may
									contact you about products, services, or content
									that might interest you.
								</div>
							</div>

							<div data-hsfc-id="Row"
								id="a80f78bc-37c1-466e-8e88-587eff926e09-3247323563373-sc-r1"
								class="hsfc-Row checkInputs">
								@include( 'partials.checkbox', [
									'id' => 'a80f78bc-37c1-466e-8e88-587eff926e09-3247323563373-sc-359395893-cc',
									'name' => 'LEGAL_CONSENT.subscription_type_359395893',
									'text' => $privacyText,
									'required' => false,
								] )
							</div>

							<div data-hsfc-id="Row"
								id="a80f78bc-37c1-466e-8e88-587eff926e09-3247323563373-sc-r2"
								class="hidden-elem hsfc-Row">
								<div data-hsfc-id="RichText"
									id="a80f78bc-37c1-466e-8e88-587eff926e09-3247323563373-sc-rt1-pc"
									class="hsfc-RichText">
									To provide the requested content, we need to
									store and process your personal data.
								</div>
							</div>

							<div data-hsfc-id="Row"
								id="a80f78bc-37c1-466e-8e88-587eff926e09-3247323563373-sc-r3"
								class="hsfc-Row">
								@include( 'partials.checkbox', [
									'id' => 'a80f78bc-37c1-466e-8e88-587eff926e09-3247323563373-sc-pc',
									'name' => 'LEGAL_CONSENT.processing',
									'text' => $marketingText,
									'required' => true,
								] )
							</div>

							<div data-hsfc-id="Row" id="a80f78bc-37c1-466e-8e88-587eff926e09-3247323563373-sc-r4"
								class="hidden-elem hsfc-Row">
								<div data-hsfc-id="RichText"
									id="a80f78bc-37c1-466e-8e88-587eff926e09-3247323563373-sc-rt2-pp"
									class="hsfc-RichText">
									You can unsubscribe anytime. Learn more in our
									<a href="https://overchain.io/canada-privacy-policy/" target="_blank"
										rel="nofollow noopener noreferrer" data-container-navigation-controller="true">
										Privacy Policy
									</a>.
								</div>
							</div>
						</div>
					</fieldset>

					<div class="field-submit hs_submit hs-submit">
						<div class="hs-field-desc" style="display: none"></div>

						<div class="actions btn-icon">
							<span class="txt">
								<input type="submit"
									class="form__button button full black flex centerH hs-button primary large"
									value="{{ esc_attr( $buttonText ) }}">
							</span>

							<span class="icon">
								<img src="{{ get_template_directory_uri() }}/assets/img/icons/btn_2.svg" alt="" />
							</span>
						</div>
					</div>

					<input name="hs_context" type="hidden"
						value='{"source":"forms-embed-static","sourceName":"forms-embed","sourceVersion":"1.0","sourceVersionMajor":"1","sourceVersionMinor":"0","referrer":"https://overchain.io/book/","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36","urlParams":{"_hsPortalId":"144737242","_hsFormId":"45818287-de80-4423-86c5-faeaaec174ed","_hsIsQa":"false","_hsHublet":"eu1","_hsDisableScriptloader":"true","_hsDisableRedirect":"true","_hsInstanceId":"20bb11ad-6121-4405-87b3-bf0999944443","_hsUtk":"873a12ef6a74c60c03360b5cf753c735"},"isHubSpotCmsGeneratedPage":false,"isCMSEditor":false,"locale":"en","formDefinitionUpdatedAt":1758037343857,"pageUrl":"https://overchain.io/","pageTitle":"Home - Overchain","pageId":null,"allPageIds":{},"hutk":"873a12ef6a74c60c03360b5cf753c735","fieldValues":{},"emailResubscribeStatus":"NOT_APPLICABLE","captchaStatus":"NOT_APPLICABLE","renderedFieldsIds":["0-1/firstname","0-1/lastname","0-1/jobtitle","0-1/email","0-1/website","0-1/phone","0-1/message"],"boolCheckBoxFields":"","__INTERNAL_PERFORMANCE__":{"formDomInteractive":295.1,"formPageLoad":302.7,"formRendered":377.6,"formReady":439.7,"formContainerScriptLoadingStart":120.4,"formContainerScriptLoadingEnd":157.2,"formScriptLoadingStart":120,"formScriptLoadingEnd":231.2,"formDefinitionLoadStart":195.8,"formDefinitionLoadEnd":351.3,"effectiveNetworkType":"4g","inferredFormType":"framed","parentDomInteractive":831.6,"parentPageLoad":1155,"parentFrameMounted":841.7},"formId":"45818287-de80-4423-86c5-faeaaec174ed","portalId":144737242,"region":"eu1","env":"prod"}' />

					<iframe
						name="submission_handler_20bb11ad-6121-4405-87b3-bf0999944443-45818287-de80-4423-86c5-faeaaec174ed"
						style="display: none"></iframe>
				</form>
			</div>
		</div>
	</div>
</section>