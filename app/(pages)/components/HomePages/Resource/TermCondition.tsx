"use client";
import React, { useEffect } from 'react'
import HeaderFooter from '../Components/HeaderFooter'
import { useTheme } from 'next-themes';

function TermCondition() {
  const {setTheme} = useTheme();
    useEffect(()=>{
        setTheme("light");
      }, []);

  return (
    <>
    
    <HeaderFooter>
        <div className='bg-[#fbf7f1] py-[5rem]'>
            <div className='text-[2.5rem] text-center font-bold'>User Terms of Service</div>
        </div>

        <div className='flex justify-center'>
        <div className='w-[800px] py-8'>
           <div className='font-semibold'>Effective date: 01.10.2023</div>
           <div className='font-semibold'>Last update date: 27.06.2024</div>
           <div>
           These user terms of service (the ‘User Terms’) govern your access and use of our online workplace productivity tools and platform (the ‘Services’). Please read them carefully. Even though you are signing in to an existing server, these User Terms apply to you as a user of the Services. We are grateful that you’re here.
           </div>
           <div className='my-4'>
            <div className='font-semibold text-[1.8rem]'>First things first</div>
            <div>
              By signing up for a Foxcolab Account (as defined in Section 1) or by using any Foxcolab Services (as defined below), you are agreeing to be bound by the following terms and conditions (the “Terms of Service”).
              As used in these Terms of Service, “we”, “us” and “Foxcolab” means the applicable Foxcolab Contracting Party (as defined in Section 4 below). The services offered by Foxcolab under the Terms of Service include various products and services to help you sell goods and services to buyers. Any such services offered by Foxcolab are referred to in these Terms of Services as the “Services”. Any new features or tools which are added to the current Services shall be also subject to the Terms of Service. Foxcolab reserves the right to update and change the Terms of Service by posting updates and changes to the Foxcolab website. You are advised to check the Terms of Service from time to time for any updates or changes that may impact you. and if you do not accept such amendments, you must cease using the Services.
            </div>
           </div>
           <div className='my-4'>
           <div className='font-semibold text-[1.8rem]'>Account Term</div>
           <div>
            <div>1. To access and use the Services, you must register for a Foxcolab account (“Account”) by providing your full legal name, a valid email address, and any other information indicated as required. Foxcolab may reject your application for an Account, or cancel an existing Account, for any reason, in our sole discretion.</div>
            <div>2. You must be the older of: (i) 18 years, or (ii) at least the age of majority in the jurisdiction where you reside and from which you use the Services to open an Account.</div>
            <div>3. You confirm that you are receiving any Services provided by Foxcolab for the purposes of carrying on a business activity and not for any personal, household or family purpose.</div>
            <div>4. You acknowledge that Foxcolab will use the email address you provide on opening an Account or as updated by you from time to time as the primary method for communication with you.</div>
            <div>5. You are responsible for keeping your password secure. Foxcolab cannot and will not be liable for any loss or damage from your failure to maintain the security of your Account and password.</div>
            <div>6. You are responsible for all activity and content such as photos, images, videos, graphics, written content, code, information, or data uploaded, collected, generated, stored, displayed, distributed, transmitted or exhibited on or in connection with your Account (“Materials”).</div>
            <div>7. A breach or violation of any term in the Terms of Service as determined in the sole discretion of Foxcolab may result in an immediate termination of your Services.</div>
           </div>

           </div>

           <div className='my-4'>
           <div className='font-semibold text-[1.8rem]'>Account Activation</div>
           <div>
            <div className='font-semibold'>Portal Owner</div>
            <div>
              <div>1. Subject to section 2.1(2), the person signing up for the Service by opening an Account will be the contracting party (“Portal Owner”) for the purposes of our Terms of Service and will be the person who is authorized to use any corresponding Account we may provide to the Portal Owner in connection with the Service. 2.If you are signing up for the Services on behalf of your employer, your employer shall be the Portal Owner. If you are signing up for the Services on behalf of your employer, then you must use your employer-issued email address and you represent and warrant that you have the authority to bind your employer to our Terms of Service.</div>
              <div>2. Your Portal can only be associated with one Portal Owner. A Portal Owner may have multiple Portals. "Portal” means the online presence we set up that is associated with the Account.</div>
            </div>
           </div>
           <div>
            <div className='font-semibold'> Internal Users</div>
            <div>
              <div>1.Based on your Foxcolab pricing plan, you can create one or more internal users (“Internal Users”) allowing other people to access the Account. With Internal Users, the Portal Owner can set permissions and let other people work in their Account while determining the level of access by Internal Users to specific business information.</div>
              <div>2. The Portal Owner is responsible and liable for the acts, omissions and defaults arising from use of Internal Users in the performance of obligations under these Terms of Service as if they were the Portal Owner’s own acts, omissions or defaults.</div>
              <div>3. The Portal Owner and the users under Internal Users are each referred to as a “Portal User”.</div>
            </div>
           </div>

           </div>

           <div className='my-4'>
           <div className='font-semibold text-[1.8rem]'>General Conditions</div>
           <div>You must read, agree with and accept all of the terms and conditions contained in these Terms of Service, including the Privacy policy before you may become a Foxcolab User.</div>
           <div>
            <div>1. Technical support in respect of the Services is only provided to Foxcolab Users.</div>
            <div>2. These Terms shall be governed by the laws of the State of New York, without regard to conflict of law provisions. In the event that a lawsuit is filed where permitted under the provisions above, or in the event that the provisions above are found not to apply to you or to a given dispute, we both agree that any judicial proceeding will be brought in the federal or state courts of New York, New York, USA. Both you and we consent to venue and personal jurisdiction there.</div>
            <div>3. You acknowledge and agree that Foxcolab may amend these Terms of Service at any time by posting the relevant amended and restated Terms of Service on Foxcolab's website. Your continued use of the Services after the amended Terms of Service are posted to Foxcolab's website constitutes your agreement to, and acceptance of, the amended Terms of Service. If you do not agree to any changes to the Terms of Service, do not continue to use the Service.</div>
            <div>4. You may not use the Foxcolab Services for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws), the laws applicable to you in your customer’s jurisdiction. You will comply with all applicable laws, rules and regulations in your use of the Service and your performance of obligations under the Terms of Service.</div>
            <div>5. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Services, or access to the Services without the express written permission by Foxcolab.</div>
            <div>6. You shall not purchase search engine or other pay per click keywords (such as Google AdWords), or domain names that use Foxcolab or Foxcolab trademarks and/or variations and misspellings thereof.</div>
            <div>7. Questions about the Terms of Service should be sent to Foxcolab support.</div>
            <div>8. You understand that your Materials (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.</div>
            <div>9. You acknowledge and agree that your use of the Services, including information transmitted to or stored by Foxcolab, is governed by its privacy policy accessible here.</div>
            <div>10. All the terms and provisions of the Terms of Service shall be binding upon and inure to the benefit of the parties to the Terms of Service and to their respective heirs, successors, permitted assigns and legal representatives. Foxcolab shall be permitted to assign these Terms of Service without notice to you or consent from you. You shall have no right to assign or otherwise transfer the Terms of Service, or any of your rights or obligations hereunder, to any third party without Foxcolab's prior written consent, to be given or withheld in Foxcolab's sole discretion.</div>
            <div>11. If any provision, or portion of the provision, in these Terms of Service is, for any reason, held to be invalid, illegal or unenforceable in any respect, then such invalidity, illegality or unenforceability will not affect any other provision (or the unaffected portion of the provision) of the Terms of Service, and the Terms of Service will be construed as if such invalid, illegal or unenforceable provision, or portion of the provision, had never been contained within the Terms of Service.</div>
           </div>
          </div>

          

        <div className='my-4'>
           <div className='font-semibold text-[1.8rem]'>Foxcolab Rights</div>
           <div>
            <div>1. We reserve the right to modify or terminate the Services for any reason, without notice at any time. Not all Services and features are available in every jurisdiction and we are under no obligation to make any Services or features available in any jurisdiction.</div>
            <div>2. We reserve the right to refuse service to anyone for any reason at any time.</div>
            <div>3. We may, but have no obligation to, remove Materials and suspend or terminate Accounts if we determine in our sole discretion that the services offered via a Foxcolab, or the Materials uploaded or posted to a Portal, violate these Terms of Service.</div>
            <div>4. Verbal or written abuse of any kind (including threats of abuse or retribution) of any Foxcolab customer, Foxcolab employee, member, or officer will result in immediate Account termination.</div>
            <div>5. Foxcolab does not pre-screen Materials and it is in our sole discretion to refuse or remove any Materials from the Service, including your Portal.</div>
            <div>6. We reserve the right to provide our services to your competitors and make no promise of exclusivity in any particular market segment. You further acknowledge and agree that Foxcolab employees and contractors may also be Foxcolab customers/merchants and that they may compete with you, although they may not use your Confidential Information (as defined in Section 6) in doing so.</div>
            <div>7. In the event of a dispute regarding Account ownership, we reserve the right to request documentation to determine or confirm Account ownership. Documentation may include, but is not limited to, a scanned copy of your business license, government issued photo ID, the last four digits of the credit card on file, your status as an employee of an entity, etc.</div>
            <div>8. Foxcolab retains the right to determine, in our sole judgment, rightful Account ownership and transfer an Account to the rightful Portal Owner. If we are unable to reasonably determine the rightful Portal Owner, without prejudice to our other rights and remedies, Foxcolab reserves the right to temporarily disable an Account until resolution has been determined between the disputing parties.
</div>
           </div>
        </div>

        <div className='my-4'>
           <div className='font-semibold text-[1.8rem]'>Confidentiality</div>
           <div>
            <div>1. “Confidential Information” shall include, but shall not be limited to, any and all information associated with a party’s business and not publicly known, including specific business information, technical processes and formulas, software, customer lists, prospective customer lists, names, addresses and other information regarding customers and prospective customers, product designs, sales, costs (including any relevant processing fees), price lists, and other unpublished financial information, business plans and marketing data, and any other confidential and proprietary information, whether or not marked as confidential or proprietary. Foxcolab Confidential Information includes all information that you receive relating to us, or to the Services, that is not known to the general public including information related to our security program and practices.</div>
            <div>2. Each party agrees to use the other party’s Confidential Information solely as necessary for performing its obligations under these Terms of Service and in accordance with any other obligations in these Terms of Service including this Section 6. Each party agrees that it shall take all reasonable steps, at least substantially equivalent to the steps it takes to protect its own proprietary information, to prevent the duplication, disclosure or use of any such Confidential Information, other than (i) by or to its employees, agents and subcontractors who must have access to such Confidential Information to perform such party’s obligations hereunder, who each shall treat such Confidential Information as provided herein, and who are each subject to obligations of confidentiality to such party that are at least as stringent as those contained herein; or (ii) as required by any law, regulation, or order of any court of proper jurisdiction over the parties and the subject matter contained in these Terms of Service, provided that, if legally permitted, the receiving party shall give the disclosing party prompt written notice and use commercially reasonable efforts to ensure that such disclosure is accorded confidential treatment. Confidential Information shall not include any information that the receiving party can prove: (A) was already in the public domain, or was already known by or in the possession of the receiving party, at the time of disclosure of such information; (B) is independently developed by the receiving party without use of or reference to the other party’s Confidential Information, and without breaching any provisions of these Terms of Service; or (C) is thereafter rightly obtained by the receiving party from a source other than the disclosing party without breaching any provision of these Terms of Service.</div>
           </div>
        </div>
        <div className='my-4'>
           <div className='font-semibold text-[1.8rem]'>Limitation of Liability</div>
           <div>
            <div>1. You expressly understand and agree that, to the extent permitted by applicable laws, Foxcolab shall not be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses resulting from the use of or inability to use the Service.</div>
            <div>2. To the extent permitted by applicable laws, in no event shall Foxcolab or our suppliers be liable for lost profits or any special, incidental or consequential damages arising out of or in connection with our site, our Services or these Terms of Service (however arising including negligence). You agree to indemnify and hold us and (as applicable) our parent, subsidiaries, affiliates, Foxcolab partners, officers, directors, agents, employees, and suppliers harmless from any claim or demand, including reasonable attorneys’ fees, made by any third party due to or arising out of your breach of these Terms of Service or the documents it incorporates by reference (including the AUP), or your violation of any law or the rights of a third party.</div>
            <div>3. Your use of the Services is at your sole risk. The Services are provided on an “as is” and “as available” basis without any warranty or condition, express, implied or statutory.</div>
            <div>4. Foxcolab does not warrant that the Services will be uninterrupted, timely, secure, or error-free.</div>
            <div>5. Foxcolab does not warrant that the results that may be obtained from the use of the Services will be accurate or reliable.</div>
            <div>6. Foxcolab does not warrant that the quality of any products, services, information, or other materials purchased or obtained by you through the Services will meet your expectations, or that any errors in the Services will be corrected.</div>
           




           </div>
        </div>

        <div className='my-4'>
           <div className='font-semibold text-[1.8rem]'>Waiver and Complete Agreement</div>
           <div>
           The failure of Foxcolab to exercise or enforce any right or provision of the Terms of Service shall not constitute a waiver of such right or provision. The Terms of Service, including the documents it incorporates by reference, constitute the entire agreement between you and Foxcolab and govern your use of the Services and your Account, superseding any prior agreements between you and Foxcolab (including, but not limited to, any prior versions of the Terms of Service).
           </div>
        </div>
        <div className='my-4'>
           <div className='font-semibold text-[1.8rem]'>Intellectual Property and Customer Content</div>
           <div>
            <div>1. We do not claim any intellectual property rights over the Materials you provide to the Service. All Materials you upload remain yours. You can remove your Portal at any time by requesting deletion of your Account.</div>
            <div>2. By uploading Materials, you agree: (a) to allow other internet users to view the Materials you post publicly to your Portal; (b) to allow Foxcolab to store, and in the case of Materials you post publicly, display and use your Materials; and (c) that Foxcolab can, at any time, review and delete all the Materials submitted to its Service, although Foxcolab is not obligated to do so.</div>
            <div>3. You retain ownership over all Materials that you upload to your Portal; however, you agree to allow others to view Materials that you post publicly to your . You are responsible for compliance of the Materials with any applicable laws or regulations.</div>
            <div>4. Foxcolab shall have the non-exclusive right and license to use the names, trademarks, service marks and logos associated with your Portal to promote the Service.</div>
           </div>
        </div>
        <div className='my-4'>
           <div className='font-semibold text-[1.8rem]'> Payment of Fees</div>
           <div>
            <div>1. You will pay the Fees applicable to your subscription to Online Service and/or POS Services (“Subscription Fees”) and any other applicable fees, including but not limited to applicable fees relating to the value of sales made through your Portal when using all payment providers other than Foxcolab Payments (“Transaction Fees”), and any fees relating to your purchase or use of any services. Together, the Subscription Fees, Transaction Fees and the Additional Fees are referred to as the “Fees”.</div>
            <div>2. You must keep a valid payment method on file with us to pay for all incurred and recurring Fees. Foxcolab will charge applicable Fees to any valid payment method that you authorize (“Authorized Payment Method”), and Foxcolab will continue to charge the Authorized Payment Method for applicable Fees until the Services are terminated, and any and all outstanding Fees have been paid in full. Unless otherwise indicated, all Fees and other charges are in U.S. dollars, and all payments shall be in U.S. currency.</div>
            <div>3. Subscription Fees are paid in advance and will be billed in monthly or annual intervals (each such date, a “Billing Date”). Transaction Fees and Additional Fees will be charged from time to time at Foxcolab's discretion. You will be charged on each Billing Date for all outstanding Fees that have not previously been charged. Invoices will appear on the Plans page of your Portal’s settings. Users have approximately two weeks to bring up and settle any issues with the billing of Subscription Fees.</div>
            <div>4. If we are not able to process payment of Fees using an Authorized Payment Method, we will make a second attempt to process payment using any Authorized Payment Method 3 days later. If the second attempt is not successful, we will make a final attempt 3 days following the second attempt. If our final attempt is not successful, we may suspend and revoke access to your Account and the Services. Your Account will be reactivated upon your payment of any outstanding Fees, plus the Fees applicable to your next billing cycle. You may not be able to access your Account or your storefront during any period of suspension. If the outstanding Fees remain unpaid for 60 days following the date of suspension, Foxcolab reserves the right to terminate your Account.</div>
            <div>5. All Fees are exclusive of applicable federal, provincial, state, local or other governmental sales, goods and services (including Goods and Sales Tax under the Goods and Services Tax Act, Chapter 117A of Singapore), harmonized or other taxes, fees or charges now in force or enacted in the future (“Taxes”).</div>
            <div>6. You are responsible for all applicable Taxes that arise from or as a result of your subscription to or purchase of Foxcolab's products and services. To the extent that Foxcolab charges these Taxes, they are calculated using the tax rates that apply based on the billing address you provide to us. Such amounts are in addition to the Fees for such products and services and will be billed to your Authorized Payment Method. If you are exempt from payment of such Taxes, you must provide us with evidence of your exemption, which in some jurisdictions includes an original certificate that satisfies applicable legal requirements attesting to tax-exempt status. Tax exemption will only apply from and after the date we receive evidence satisfactory to Foxcolab of your exemption. If you are not charged Taxes by Foxcolab, you are responsible for determining if Taxes are payable, and if so, self-remitting Taxes to the appropriate tax authorities in your jurisdiction.</div>
            <div>7. For the avoidance of doubt, all sums payable by you to Foxcolab under these Terms of Service shall be paid free and clear of any deductions or withholdings whatsoever. Other than Taxes charged by Foxcolab to you and remitted to the appropriate tax authorities on your behalf, any deductions or withholdings that are required by law shall be borne by you and paid separately to the relevant taxation authority. Foxcolab shall be entitled to charge the full amount of Fees stipulated under these Terms of Service to your Authorized Payment Method ignoring any such deduction or withholding that may be required.</div>
            <div>8. You must maintain an accurate location in the administration menu of your Portal. If you change jurisdictions you must promptly update your location in the administration menu.</div>
            <div>9. Foxcolab does not provide refunds.</div>
           </div>
        </div>
        <div className='my-4'>
           <div className='font-semibold text-[1.8rem]'>Cancellation and Termination</div>
           <div>
            <div>1. You may cancel your Account and terminate the Terms of Service at any time by contacting Foxcolab Support and then following the specific instructions indicated to you in Foxcolab's response.</div>
            <div>Upon termination of the Services by either party for any reason:</div>
            <div>i. Foxcolab will cease providing you with the Services and you will no longer be able to access your Account;</div>
            <div>ii. unless otherwise provided in the Terms of Service, you will not be entitled to any refunds of any Fees, pro rata or otherwise;</div>
            <div>iii. any outstanding balance owed to Foxcolab for your use of the Services through the effective date of such termination will immediately become due and payable in full; and
          your Portal will be taken offline.</div>
          <div>
          iv. If at the date of termination of the Service, there are any outstanding Fees owing by you, you will receive one final invoice via email. Once that invoice has been paid in full, you will not be charged again.
          </div>
          <div>v. We reserve the right to modify or terminate the Foxcolab Service, the Terms of Service and/or your Account for any reason, without notice at any time. Termination of the Terms of Service shall be without prejudice to any rights or obligations which arose prior to the date of termination.</div>
          <div> vi. 
          Fraud: Without limiting any other remedies, Foxcolab may suspend or terminate your Account if we suspect that you (by conviction, settlement, insurance or escrow investigation, or otherwise) have engaged in fraudulent activity in connection with the use of the Services.
          </div>

           </div>
        </div>
        <div className='my-4'>
           <div className='font-semibold text-[1.8rem]'>Modifications to the Service and Prices</div>
           <div>
            <div>1. Prices for using the Services are subject to change upon 30 days’ notice from Foxcolab. Such notice may be provided at any time by posting the changes to the Foxcolab Site (Foxcolab.com) or the administration menu of your Portal via an announcement.</div>
            <div>2. Foxcolab reserves the right at any time, and from time to time, to modify or discontinue, the Services (or any part thereof) with or without notice.</div>
            <div>3. Foxcolab shall not be liable to you or to any third party for any modification, price change, suspension or discontinuance of the Service.</div>
           


           </div>
        </div>

        <div className='my-4'>
           <div className='font-semibold text-[1.8rem]'>Rights of Third Parties</div>
           <div>
           Save for Foxcolab and its affiliates, Portal Users or anyone accessing Foxcolab Services pursuant to these Terms of Service, unless otherwise provided in these Terms of Service, no person or entity who is not a party to these Terms of Service shall have any right to enforce any term of these Terms of Service, regardless of whether such person or entity has been identified by name, as a member of a class or as answering a particular description. For the avoidance of doubt, this shall not affect the rights of any permitted assignee or transferee of these Terms.


           </div>
        </div>

        <div className='my-4'>
           <div className='font-semibold text-[1.8rem]'>Privacy & Data Protection</div>
           <div>
           Foxcolab is firmly committed to protecting the privacy of your personal information and the personal information of your customers. By using the Service, you acknowledge and agree that Foxcolab's collection, usage and disclosure of this personal information is governed by our Privacy Policy.


           </div>
        </div>

        



        </div>
        </div>




    </HeaderFooter>
    
    
    </>
  )
}

export default TermCondition