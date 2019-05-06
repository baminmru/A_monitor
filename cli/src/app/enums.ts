
export namespace enums {
 export enum enum_StructType {
	/* StructType - Тип раздела */ 
	StructType_Stroka_atributov=0 // Строка атрибутов
	,StructType_Kollekciy=1 // Коллекция
	,StructType_Derevo=2 // Дерево
}
 export enum enum_WFFuncParam {
	/* WFFuncParam - Вариант расшифровки параметра функции */ 
	WFFuncParam_Rol_=8 // Роль
	,WFFuncParam_Viragenie=2 // Выражение
	,WFFuncParam_Dokument=5 // Документ
	,WFFuncParam_Pole=7 // Поле
	,WFFuncParam_Tip_dokumenta=9 // Тип документа
	,WFFuncParam_Znacenie=0 // Значение
	,WFFuncParam_Razdel=6 // Раздел
	,WFFuncParam_Dokument_processa=4 // Документ процесса
	,WFFuncParam_Papka=3 // Папка
	,WFFuncParam_Znacenie_iz_parametra=1 // Значение из параметра
}
 export enum enum_ReportType {
	/* ReportType - Вариант отчета */ 
	ReportType_Eksport_po_Excel_sablonu=4 // Экспорт по Excel шаблону
	,ReportType_Tablica=0 // Таблица
	,ReportType_Eksport_po_WORD_sablonu=3 // Экспорт по WORD шаблону
	,ReportType_Dvumernay_matrica=1 // Двумерная матрица
	,ReportType_Tol_ko_rascet=2 // Только расчет
}
 export enum enum_Education {
	/* Education - Образование */ 
	Education_Ne_vagno=-1 // Не важно
	,Education_Srednee=1 // Среднее
	,Education_Vissee=4 // Высшее
	,Education_Nepolnoe_vissee=3 // Неполное высшее
	,Education_Nepolnoe_srednee=0 // Неполное среднее
	,Education_Neskol_ko_vissih=5 // Несколько высших
	,Education_Srednee_special_noe=2 // Среднее специальное
}
 export enum enum_TypeStyle {
	/* TypeStyle - Вариант трактовки типа поля */ 
	TypeStyle_Ssilka=4 // Ссылка
	,TypeStyle_Viragenie=1 // Выражение
	,TypeStyle_Element_oformleniy=5 // Элемент оформления
	,TypeStyle_Interval=3 // Интервал
	,TypeStyle_Perecislenie=2 // Перечисление
	,TypeStyle_Skalyrniy_tip=0 // Скалярный тип
}
 export enum enum_ReplicationType {
	/* ReplicationType - Вариант репликации докуента */ 
	ReplicationType_Postrocno=1 // Построчно
	,ReplicationType_Ves__dokument=0 // Весь документ
	,ReplicationType_Lokal_niy=2 // Локальный
}
 export enum enum_NumerationRule {
	/* NumerationRule - Правило нумерации */ 
	NumerationRule_Po_kvartalu=2 // По кварталу
	,NumerationRule_Po_mesycu=3 // По месяцу
	,NumerationRule_Edinay_zona=0 // Единая зона
	,NumerationRule_Po_dnu=4 // По дню
	,NumerationRule_Po_godu=1 // По году
	,NumerationRule_Proizvol_nie_zoni=10 // Произвольные зоны
}
 export enum enum_WFProcessState {
	/* WFProcessState - Состояния процесса */ 
	WFProcessState_Pause=3 // Pause
	,WFProcessState_Active=2 // Active
	,WFProcessState_Done=4 // Done
	,WFProcessState_Prepare=1 // Prepare
	,WFProcessState_Initial=0 // Initial
	,WFProcessState_Processed=5 // Processed
}
 export enum enum_MenuActionType {
	/* MenuActionType - Вариант действия при выборе пункта меню */ 
	MenuActionType_Zapustit__ARM=4 // Запустить АРМ
	,MenuActionType_Vipolnit__metod=2 // Выполнить метод
	,MenuActionType_Otkrit__otcet=5 // Открыть отчет
	,MenuActionType_Nicego_ne_delat_=0 // Ничего не делать
	,MenuActionType_Otkrit__dokument=1 // Открыть документ
	,MenuActionType_Otkrit__gurnal=3 // Открыть журнал
}
 export enum enum_WFShortcutType {
	/* WFShortcutType - Варианты ярлыков, которые может размещать процесс */ 
	WFShortcutType_Document=0 // Document
	,WFShortcutType_Process=2 // Process
	,WFShortcutType_Function=1 // Function
}
 export enum enum_VHAlignment {
	/* VHAlignment - Выравнивание */ 
	VHAlignment_Right_Top=6 // Right Top
	,VHAlignment_Right_Center=7 // Right Center
	,VHAlignment_Right_Bottom=8 // Right Bottom
	,VHAlignment_Center_Top=3 // Center Top
	,VHAlignment_Left_Top=0 // Left Top
	,VHAlignment_Center_Center=4 // Center Center
	,VHAlignment_Left_Center=1 // Left Center
	,VHAlignment_Center_Bottom=5 // Center Bottom
	,VHAlignment_Left_Bottom=2 // Left Bottom
}
 export enum enum_CurrencyType {
	/* CurrencyType - Валюта платежа */ 
	CurrencyType_Evro=2 // Евро
	,CurrencyType_Rubl_=0 // Рубль
	,CurrencyType_Dollar=1 // Доллар
}
 export enum enum_InfoStoreType {
	/* InfoStoreType - Тип каталога */ 
	InfoStoreType_Gruppovoy=2 // Групповой
	,InfoStoreType_cls__Obsiy=0 //  Общий
	,InfoStoreType_Personal_niy=1 // Персональный
}
 export enum enum_DevelopmentBase {
	/* DevelopmentBase - Платформа разработки */ 
	DevelopmentBase_OTHER=3 // OTHER
	,DevelopmentBase_DOTNET=1 // DOTNET
	,DevelopmentBase_JAVA=2 // JAVA
	,DevelopmentBase_VB6=0 // VB6
}
 export enum enum_Quarter {
	/* Quarter - Квартал */ 
	Quarter_I=1 // I
	,Quarter_IV=4 // IV
	,Quarter_QMARK=0 // ?
	,Quarter_II=2 // II
	,Quarter_III=3 // III
}
 export enum enum_Months {
	/* Months - Месяцы */ 
	Months_May=5 // Май
	,Months_Sentybr_=9 // Сентябрь
	,Months_Iun_=6 // Июнь
	,Months_Dekabr_=12 // Декабрь
	,Months_Ynvar_=1 // Январь
	,Months_Avgust=8 // Август
	,Months_Fevral_=2 // Февраль
	,Months_Aprel_=4 // Апрель
	,Months_Iul_=7 // Июль
	,Months_Oktybr_=10 // Октябрь
	,Months_Mart=3 // Март
	,Months_Noybr_=11 // Ноябрь
}
 export enum enum_ColumnSortType {
	/* ColumnSortType - Вариант сортиовки данных колонки */ 
	ColumnSortType_As_String=0 // As String
	,ColumnSortType_As_Numeric=1 // As Numeric
	,ColumnSortType_As_Date=2 // As Date
}
 export enum enum_Boolean {
	/* Boolean - Да / Нет */ 
	Boolean_Da=-1 // Да
	,Boolean_Net=0 // Нет
}
 export enum enum_JournalLinkType {
	/* JournalLinkType - Для связи журналов друг с другом */ 
	JournalLinkType_Net=0 // Нет
	,JournalLinkType_Svyzka_ParentStructRowID__OPNv_peredlah_ob_ektaCLS=4 // Связка ParentStructRowID  (в передлах объекта)
	,JournalLinkType_Svyzka_InstanceID_OPNv_peredlah_ob_ektaCLS=3 // Связка InstanceID (в передлах объекта)
	,JournalLinkType_Ssilka_na_ob_ekt=1 // Ссылка на объект
	,JournalLinkType_Ssilka_na_stroku=2 // Ссылка на строку
}
 export enum enum_TargetType {
	/* TargetType - Вариант уровня приложения, куда может генерироваться код */ 
	TargetType_SUBD=0 // СУБД
	,TargetType_Dokumentaciy=3 // Документация
	,TargetType_MODEL_=1 // МОДЕЛЬ
	,TargetType_Prilogenie=2 // Приложение
	,TargetType_ARM=4 // АРМ
}
 export enum enum_ParityType {
	/* ParityType - Четность */ 
	ParityType_Space=4 // Space
	,ParityType_Mark=3 // Mark
	,ParityType_Odd=2 // Odd
	,ParityType_None=0 // None
	,ParityType_Even=1 // Even
}
 export enum enum_MesureFormat {
	/* MesureFormat - Формат индикатора */ 
	MesureFormat_Cislo=0 // Число
	,MesureFormat_Data=1 // Дата
	,MesureFormat_Ob_ekt=4 // Объект
	,MesureFormat_Spravocnik=2 // Справочник
	,MesureFormat_Tekst=5 // Текст
}
 export enum enum_ExportType {
	/* ExportType - Тип экспорта */ 
	ExportType_Sayt_i_MB=3 // Сайт и МБ
	,ExportType_Sayt=1 // Сайт
	,ExportType_Net=0 // Нет
}
 export enum enum_WFStepClass {
	/* WFStepClass - Тип шага процесса */ 
	WFStepClass_PeriodicFunction=3 // PeriodicFunction
	,WFStepClass_SimpleFunction=0 // SimpleFunction
	,WFStepClass_StopFunction=2 // StopFunction
	,WFStepClass_StartFunction=1 // StartFunction
}
 export enum enum_DayInWeek {
	/* DayInWeek - День недели */ 
	DayInWeek_Cetverg=4 // Четверг
	,DayInWeek_Subbota=6 // Суббота
	,DayInWeek_Ponedel_nik=1 // Понедельник
	,DayInWeek_Voskresen_e=7 // Воскресенье
	,DayInWeek_Vtornik=2 // Вторник
	,DayInWeek_Pytnica=5 // Пятница
	,DayInWeek_Sreda=3 // Среда
}
 export enum enum_GeneratorStyle {
	/* GeneratorStyle - GeneratorStyle */ 
	GeneratorStyle_Odin_tip=0 // Один тип
	,GeneratorStyle_Vse_tipi_srazu=1 // Все типы сразу
}
 export enum enum_PlatType {
	/* PlatType - Тип плательщика */ 
	PlatType_Polucatel_=1 // Получатель
	,PlatType_Otpravitel_=0 // Отправитель
	,PlatType_Drugoy=2 // Другой
}
 export enum enum_msgState {
	/* msgState - Состояние заявки */ 
	msgState_Soobseno_abonentu=1 // Сообщено абоненту
	,msgState_Promegutocniy_otvet=3 // Промежуточный ответ
	,msgState_Sostoynie_zayvki=0 // Состояние заявки
	,msgState_Abonent_ne_otvetil=2 // Абонент не ответил
}
 export enum enum_OnJournalRowClick {
	/* OnJournalRowClick - действие при открытии строки журнала */ 
	OnJournalRowClick_Otkrit__dokument=2 // Открыть документ
	,OnJournalRowClick_Nicego_ne_delat_=0 // Ничего не делать
	,OnJournalRowClick_Otkrit__stroku=1 // Открыть строку
}
 export enum enum_PartType {
	/* PartType - PartType */ 
	PartType_Kollekciy=1 // Коллекция
	,PartType_Derevo=2 // Дерево
	,PartType_Stroka=0 // Строка
	,PartType_Rassirenie_s_dannimi=4 // Расширение с данными
	,PartType_Rassirenie=3 // Расширение
}
 export enum enum_ReferenceType {
	/* ReferenceType - ReferenceType */ 
	ReferenceType_Na_istocnik_dannih=3 // На источник данных
	,ReferenceType_Skalyrnoe_pole_OPN_ne_ssilkaCLS=0 // Скалярное поле ( не ссылка)
	,ReferenceType_Na_stroku_razdela=2 // На строку раздела
	,ReferenceType_Na_ob_ekt_=1 // На объект 
}
 export enum enum_stateNomen {
	/* stateNomen -  */ 
	stateNomen_Dostavleno=4 // Доставлено
	,stateNomen_Prinyto=2 // Принято
	,stateNomen_V_processe=3 // В процессе
	,stateNomen_Pereadresaciy=6 // Переадресация
	,stateNomen_Oformlyetsy=0 // Оформляется
	,stateNomen_Vozvrat=5 // Возврат
}
 export enum enum_ConditionType {
	/* ConditionType - Варианты условий */ 
	ConditionType_LS=6 // <
	,ConditionType_GTEQ=4 // >=
	,ConditionType_LSEQ=7 // <=
	,ConditionType_none=0 // none
	,ConditionType_EQ=1 // =
	,ConditionType_like=8 // like
	,ConditionType_GT=3 // >
	,ConditionType_LSGT=2 // <>
}
 export enum enum_FolderType {
	/* FolderType - Тип папки */ 
	FolderType_Udalennie=3 // Удаленные
	,FolderType_Vhodysie=1 // Входящие
	,FolderType_Otlogennie=9 // Отложенные
	,FolderType_Gurnal=4 // Журнал
	,FolderType_Ishodysie=2 // Исходящие
	,FolderType_Cernoviki=7 // Черновики
	,FolderType_Otpravlennie=6 // Отправленные
	,FolderType_V_rabote=8 // В работе
	,FolderType_Kalendar_=5 // Календарь
	,FolderType_Zaversennie=10 // Завершенные
	,FolderType_cls__=0 // cls__
}
 export enum enum_msgResult {
	/* msgResult - Результат */ 
	msgResult_Vipolneno=2 // Выполнено
	,msgResult_V_rabote=1 // В работе
	,msgResult_Rezul_tat=0 // Результат
}
 export enum enum_PartAddBehaivor {
	/* PartAddBehaivor - Поведение при добавлении строки раздела */ 
	PartAddBehaivor_AddForm=0 // AddForm
	,PartAddBehaivor_RunAction=2 // RunAction
	,PartAddBehaivor_RefreshOnly=1 // RefreshOnly
}
 export enum enum_ExtentionType {
	/* ExtentionType - Тип расширения */ 
	ExtentionType_VerifyRowExt=6 // VerifyRowExt
	,ExtentionType_CodeGenerator=7 // CodeGenerator
	,ExtentionType_DefaultExt=5 // DefaultExt
	,ExtentionType_StatusExt=0 // StatusExt
	,ExtentionType_JrnlRunExt=4 // JrnlRunExt
	,ExtentionType_CustomExt=2 // CustomExt
	,ExtentionType_ARMGenerator=8 // ARMGenerator
	,ExtentionType_OnFormExt=1 // OnFormExt
	,ExtentionType_JrnlAddExt=3 // JrnlAddExt
}
 export enum enum_Sex {
	/* Sex - Мужской / Женский */ 
	Sex_Ne_susestvenno=0 // Не существенно
	,Sex_Mugskoy=1 // Мужской
	,Sex_Genskiy=-1 // Женский
}
 export enum enum_YesNo {
	/* YesNo - Да / Нет (0 или 1) */ 
	YesNo_Da=1 // Да
	,YesNo_Net=0 // Нет
}
 export enum enum_AggregationType {
	/* AggregationType - Вариант агрегации по полю */ 
	AggregationType_SUM=3 // SUM
	,AggregationType_AVG=1 // AVG
	,AggregationType_CUSTOM=6 // CUSTOM
	,AggregationType_none=0 // none
	,AggregationType_COUNT=2 // COUNT
	,AggregationType_MAX=5 // MAX
	,AggregationType_MIN=4 // MIN
}
 export enum enum_WFFuncState {
	/* WFFuncState - Состояние функции в бизнес процессе */ 
	WFFuncState_Processed=8 // Processed
	,WFFuncState_InWork=3 // InWork
	,WFFuncState_Pause=4 // Pause
	,WFFuncState_InControl=6 // InControl
	,WFFuncState_Active=2 // Active
	,WFFuncState_Ready=5 // Ready
	,WFFuncState_Done=7 // Done
	,WFFuncState_Prepare=1 // Prepare
	,WFFuncState_Initial=0 // Initial
}
 export enum enum_Employment {
	/* Employment - Занятость */ 
	Employment_Casticnay=1 // Частичная
	,Employment_Ne_vagno=-1 // Не важно
	,Employment_Polnay=0 // Полная
}
 export enum enum_TriState {
	/* TriState - Да / Нет / Не определено */ 
	TriState_Ne_susestvenno=-1 // Не существенно
	,TriState_Da=1 // Да
	,TriState_Net=0 // Нет
}

}