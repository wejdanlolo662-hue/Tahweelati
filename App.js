
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar
} from 'react-native';

const BLUE = '#1769AA';
const LIGHT = '#EAF4FC';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');
  const [isChild, setIsChild] = useState(false);
  const [guardian, setGuardian] = useState('');
  const [notice, setNotice] = useState('');

  const go = (page) => {
    setNotice('');
    setScreen(page);
  };

  const Button = ({ title, action, light = false }) => (
    <TouchableOpacity
      style={[styles.button, light && styles.lightButton]}
      onPress={action}
    >
      <Text style={[
        styles.buttonText,
        light && styles.lightText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const Header = ({ title }) => (
    <View style={styles.header}>
      <Text style={styles.logo}>تحويلتي</Text>
      <Text style={styles.subtitle}>
        المستشفى الوطني - نابلس
      </Text>
      <Text style={styles.pageTitle}>{title}</Text>
    </View>
  );

  const savePatient = () => {
    if (!name.trim() || !id.trim() || !phone.trim()) {
      setNotice('يرجى تعبئة جميع البيانات المطلوبة');
      return;
    }

    if (isChild && !guardian.trim()) {
      setNotice('يرجى إدخال اسم ولي الأمر');
      return;
    }

    setNotice('تم تسجيل البيانات التجريبية بنجاح');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        backgroundColor={BLUE}
        barStyle="light-content"
      />

      <ScrollView contentContainerStyle={styles.container}>

        <Header title={
          screen === 'home' ? 'بوابة المريض' :
          screen === 'register' ? 'تسجيل المريض' :
          screen === 'track' ? 'متابعة التحويلة' :
          screen === 'finance' ? 'التغطية المالية' :
          screen === 'approvals' ? 'اعتمادات التحويلة' :
          'التواصل معنا'
        } />

        {screen === 'home' && (
          <>
            <View style={styles.welcome}>
              <Text style={styles.welcomeTitle}>
                أهلاً بك في تحويلتي
              </Text>
              <Text style={styles.description}>
                بوابتك الإلكترونية لمتابعة إجراءات التحويلات الطبية
                بسهولة ووضوح.
              </Text>
            </View>

            <Text style={styles.section}>
              الخدمات الإلكترونية
            </Text>

            <Button
              title="👤 تسجيل مريض جديد"
              action={() => go('register')}
            />

            <Button
              title="📋 متابعة التحويلة"
              light
              action={() => go('track')}
            />

            <Button
              title="💳 التغطية المالية"
              light
              action={() => go('finance')}
            />

            <Button
              title="✍️ اعتمادات التحويلة"
              light
              action={() => go('approvals')}
            />

            <Button
              title="☎ التواصل مع قسم التحويلات"
              light
              action={() => go('contact')}
            />

            <Text style={styles.warning}>
              نسخة تجريبية للعرض فقط
            </Text>
          </>
        )}

        {screen === 'register' && (
          <>
            <Text style={styles.section}>
              معلومات المريض
            </Text>

            <Text style={styles.label}>نوع التسجيل</Text>

            <View style={styles.choice}>
              <Button
                title="بالغ"
                light={!isChild}
                action={() => setIsChild(false)}
              />
              <Button
                title="طفل"
                light={isChild}
                action={() => setIsChild(true)}
              />
            </View>

            <Text style={styles.label}>اسم المريض</Text>
            <TextInput
              style={styles.input}
              placeholder="الاسم الكامل"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>رقم الهوية</Text>
            <TextInput
              style={styles.input}
              placeholder="رقم تجريبي"
              keyboardType="numeric"
              value={id}
              onChangeText={setId}
            />

            {isChild && (
              <>
                <Text style={styles.label}>اسم ولي الأمر</Text>
                <TextInput
                  style={styles.input}
                  placeholder="اسم الأب أو الأم"
                  value={guardian}
                  onChangeText={setGuardian}
                />
              </>
            )}

            <Text style={styles.label}>رقم الهاتف</Text>
            <TextInput
              style={styles.input}
              placeholder="رقم الهاتف"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <View style={styles.info}>
              <Text style={styles.infoText}>
                في النظام النهائي ستتم إضافة رفع صورة الهوية
                والتحقق من بيانات المريض وفق إجراءات المستشفى.
              </Text>
            </View>

            <Button
              title="حفظ البيانات التجريبية"
              action={savePatient}
            />

            {notice !== '' && (
              <Text style={styles.notice}>{notice}</Text>
            )}

            <Button
              title="رجوع"
              light
              action={() => go('home')}
            />
          </>
        )}

        {screen === 'track' && (
          <>
            <Text style={styles.section}>
              مراحل التحويلة الطبية
            </Text>

            {[
              'تقديم طلب التحويلة',
              'مراجعة الطبيب المختص',
              'مراجعة قسم التحويلات',
              'مراجعة التأمين والتغطية المالية',
              'اعتماد المدير',
              'اعتماد الإدارة',
              'إصدار التحويلة النهائية'
            ].map((step, index) => (
              <View style={styles.step} key={index}>
                <View style={styles.number}>
                  <Text style={styles.numberText}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={styles.stepText}>
                  {step}
                </Text>
              </View>
            ))}

            <Text style={styles.warning}>
              جميع المراحل توضيحية، وسيتم تحديثها عند
              ربط التطبيق بالنظام الرسمي.
            </Text>

            <Button
              title="رجوع"
              light
              action={() => go('home')}
            />
          </>
        )}

        {screen === 'finance' && (
          <>
            <Text style={styles.section}>
              إشعارات التغطية المالية
            </Text>

            <View style={styles.info}>
              <Text style={styles.infoText}>
                يتم التحقق من صلاحية التأمين قبل استكمال
                إجراءات التحويلة.
              </Text>
            </View>

            <View style={styles.status}>
              <Text style={styles.statusTitle}>
                حالة التأمين
              </Text>
              <Text style={styles.statusValue}>
                بانتظار الربط بالنظام الرسمي
              </Text>
            </View>

            <Text style={styles.warning}>
              لا يتم اعتماد صلاحية التأمين من هذه النسخة التجريبية.
            </Text>

            <Button
              title="رجوع"
              light
              action={() => go('home')}
            />
          </>
        )}

        {screen === 'approvals' && (
          <>
            <Text style={styles.section}>
              الاعتمادات الإلكترونية
            </Text>

            {[
              'توقيع الطبيب المختص',
              'اعتماد قسم التحويلات',
              'توقيع المدير',
              'اعتماد الإدارة',
              'إصدار ملف PDF النهائي'
            ].map((item, index) => (
              <View style={styles.approval} key={index}>
                <Text style={styles.approvalText}>
                  {item}
                </Text>
                <Text style={styles.pending}>
                  بانتظار الربط والاعتماد
                </Text>
              </View>
            ))}

            <View style={styles.info}>
              <Text style={styles.infoText}>
                التوقيعات والأختام الإلكترونية تحتاج إلى
                نظام موثوق وصلاحيات رسمية معتمدة من المستشفى.
              </Text>
            </View>

            <Button
              title="رجوع"
              light
              action={() => go('home')}
            />
          </>
        )}

        {screen === 'contact' && (
          <>
            <Text style={styles.section}>
              قسم التحويلات
            </Text>

            <View style={styles.info}>
              <Text style={styles.infoText}>
                سيتم إضافة رقم الهاتف وساعات العمل
                ووسائل التواصل الرسمية بعد اعتمادها.
              </Text>
            </View>

            <Button
              title="رجوع"
              light
              action={() => go('home')}
            />
          </>
        )}

        <Text style={styles.footer}>
          تحويلتي | المستشفى الوطني - نابلس
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F9FD'
  },
  container: {
    padding: 18,
    paddingBottom: 40
  },
  header: {
    backgroundColor: BLUE,
    padding: 24,
    borderRadius: 20,
    marginBottom: 22,
    alignItems: 'center'
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#DCEEFF',
    fontSize: 14,
    marginTop: 5
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 14
  },
  welcome: {
    backgroundColor: LIGHT,
    padding: 22,
    borderRadius: 18,
    marginBottom: 20
  },
  welcomeTitle: {
    color: BLUE,
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  description: {
    color: '#35566F',
    fontSize: 15,
    textAlign: 'right',
    lineHeight: 25,
    marginTop: 10
  },
  section: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#24465F',
    textAlign: 'right',
    marginBottom: 15,
    marginTop: 8
  },
  button: {
    backgroundColor: BLUE,
    padding: 16,
    borderRadius: 13,
    alignItems: 'center',
    marginVertical: 7
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  lightButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B7D4EA'
  },
  lightText: {
    color: BLUE
  },
  label: {
    textAlign: 'right',
    color: '#24465F',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 7
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C9DCEB',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    textAlign: 'right'
  },
  choice: {
    flexDirection: 'row-reverse',
    gap: 10
  },
  info: {
    backgroundColor: LIGHT,
    padding: 16,
    borderRadius: 13,
    marginVertical: 14
  },
  infoText: {
    color: '#244D6A',
    textAlign: 'right',
    lineHeight: 25,
    fontSize: 14
  },
  notice: {
    color: '#17633A',
    backgroundColor: '#E6F6EC',
    padding: 13,
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 10
  },
  step: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 13,
    marginBottom: 10
  },
  number: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12
  },
  numberText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  stepText: {
    flex: 1,
    textAlign: 'right',
    color: '#24465F',
    fontSize: 15,
    fontWeight: 'bold'
  },
  status: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14
  },
  statusTitle: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 17,
    color: BLUE
  },
  statusValue: {
    textAlign: 'right',
    color: '#A15C12',
    marginTop: 10
  },
  approval: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10
  },
  approvalText: {
    color: '#24465F',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 15
  },
  pending: {
    color: '#A15C12',
    textAlign: 'right',
    fontSize: 12,
    marginTop: 8
  },
  warning: {
    textAlign: 'center',
    color: '#94652A',
    fontSize: 12,
    marginVertical: 15,
    lineHeight: 20
  },
  footer: {
    color: '#8A9BA8',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 25
  }
});
